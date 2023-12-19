const root = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/"
const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const parser = new XMLParser();

export async function pmcSearchToXML(query) {
    return fetch(root + `esearch.fcgi?db=pubmed&term=${encodeURI(query)}`)
    .then((data) => data.text())
    .then((text) => {
        xmlDoc = parser.parse(text);
        console.log(xmlDoc)
        return (xmlDoc)
    })
    .catch((err) => {
        console.log(err)
    })
}

export async function pmcSearchToArticleXML(query) {
    const searchXML = await pmcSearchToXML(query)
    let ids = searchXML["eSearchResult"]["IdList"]["Id"]
    return fetch(root + `esummary.fcgi?db=pubmed&id=${encodeURI(ids.join(','))}`)
    .then((data) => data.text())
    .then((text) => {
        xmlDoc = parser.parse(text);
        console.log(xmlDoc)
        return xmlDoc["eSummaryResult"]["DocSum"]
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