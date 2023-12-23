const root = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/"
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const parser = new XMLParser();




export function extractQueryType(xml) {

    str = String(xml["QueryTranslation"])
    console.log(str)
    queryTypeList = []
    
    if(str.indexOf("[Author]") != -1) {
        queryTypeList.push("author")
    }
    if(str.indexOf("[MeSH Terms]") != -1 || str.indexOf("[All Fields]") != -1) {
        queryTypeList.push("article")
    }
    
    return queryTypeList;

}


export async function pmcSearchToXML(query, start = 0) {
    return fetch(root + `esearch.fcgi?db=pubmed&term=${encodeURI(query)}&retstart=${start}`)
    .then((data) => data.text())
    .then((text) => {
        xml = parser.parse(text);
        res = xml["eSearchResult"]
        queryType = extractQueryType(res)
        return res
    })
    .catch((err) => {
        console.log(err)
    })
}

export async function pmcSearchToArticleXML(query, xml = null) {
    const searchXML = xml
    if(!xml)
        searchXML = await pmcSearchToXML(query)

    let ids = searchXML["IdList"]["Id"]
    return fetch(root + `esummary.fcgi?db=pubmed&id=${encodeURI(ids.join(','))}`)
    .then((data) => data.text())
    .then((text) => {
        console.log("grabbed articles")
        let articles = []
        xmlDoc = parser.parse(text);
        docSum = xmlDoc["eSummaryResult"]["DocSum"]
        for(article of docSum) {
            articles.push({
                "id": article["Id"],
                "header": article["Item"][5],
                "authors": Array(article["Item"][3]["Item"]).join(', '),
                "category": "article",
            })
        }
        return articles
    })
    .catch((err) => {
        console.log(err)
    })
}


export async function pmcSearchResults(query) {
    const searchXML = await pmcSearchToXML(query);
    results = [];
    queryTypes = extractQueryType(searchXML)
    console.log(queryTypes)

    if(queryTypes.includes("author")) {

        /* fetch author info from GScholar */

        fetch(`http://192.168.99.113:8000/api/author`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: query
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(JSON.parse(data))
        })
        .catch(error => {
            console.log(error);
        });
        results.push({
            "category": "author",
            "name": "AUTHOR_HERE",
            "affiliation": "AFF_HERE",
            "id": 0
        })

    }
    await pmcSearchToArticleXML("", xml = searchXML)
    .then((res) => {
        results = [...results, res].flat()
    })
    return results;
}

export async function pmcIdToArticleFetch(id) {

    console.log(id)

    query = id
    if(id.length) query = id.join(',')
    return fetch(root + `efetch.fcgi?db=pubmed&id=${encodeURI(query)}`)
    .then((data) => data.text())
    .then((text) => {
        xml = parser.parse(text);
        res = xml["PubmedArticleSet"]["PubmedArticle"]["MedlineCitation"]["Article"]
        console.log(res)
        return res
    })
    .catch((err) => {
        console.log(err)
    })

}


/*
fetch(`http://192.168.99.113:8000/api/author`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            setSearchData(JSON.parse(data));
            setDisplayResults(true);
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
*/