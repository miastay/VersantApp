import { StyleSheet, View, Image } from 'react-native';
import VSSearchBar from '../components/VSSearchBar';
import { palette } from '../assets/palette';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VSHeaderText from '../components/text/VSHeaderText';
import VSSearchRecommendations from '../components/VSSearchRecommendations';
import { useState } from 'react';
import VSSearchResultsView from './VSSearchResultsView';
import { extractQueryType, pmcSearchResults, pmcSearchToArticleXML, pmcSearchToXML } from '../api/entrez';
import VSArticleView from './VSArticleView';
import { BlurView } from 'expo-blur';

const VSSearch = ({navigation}) => {

    const [currentSearch, setCurrentSearch] = useState('');
    const [displayResults, setDisplayResults] = useState(false);
    const [searchData, setSearchData] = useState(null);


    const dummyData = {
        "1KfHz7YAAAAJ": {
            "affiliation": "associate professor, Tsinghua University", 
            "citedby": 34, 
            "container_type": "Author", 
            "email_domain": "@tsinghua.edu.cn", 
            "filled": [], "interests": ["law"], 
            "name": "xinjun zhang", 
            "scholar_id": "1KfHz7YAAAAJ", 
            "source": "SEARCH_AUTHOR_SNIPPETS", 
            "url_picture": "https://scholar.google.com/citations?view_op=medium_photo&user=1KfHz7YAAAAJ"
        }, 
        "INMp_3EAAAAJ": {
            "affiliation": "Merck", 
            "citedby": 1406, 
            "container_type": "Author", 
            "email_domain": "", 
            "filled": [], 
            "interests": ["Retina", "Development", "Neuronal Circuitry", "Stem Cell"], 
            "name": "Xin-Jun Zhang", 
            "scholar_id": "INMp_3EAAAAJ", 
            "source": "SEARCH_AUTHOR_SNIPPETS", 
            "url_picture": "https://scholar.google.com/citations?view_op=medium_photo&user=INMp_3EAAAAJ"
        }, 
        "XYT3KvEAAAAJ": {
            "affiliation": "Boston Children's Hospital, Harvard Medical School", 
            "citedby": 3600, 
            "container_type": "Author", 
            "email_domain": "@childrens.harvard.edu", 
            "filled": [], 
            "interests": ["Wnt Signal Pathway", "Development and Diseases."], 
            "name": "Zhang Xinjun", 
            "scholar_id": "XYT3KvEAAAAJ", 
            "source": "SEARCH_AUTHOR_SNIPPETS", 
            "url_picture": "https://scholar.google.com/citations?view_op=medium_photo&user=XYT3KvEAAAAJ"
        }, 
        "ZPtvttkAAAAJ": {
            "affiliation": "Assistant Professor, University of Michigan, Ann Arbor",
            "citedby": 568, 
            "container_type": "Author", 
            "email_domain": "@med.umich.edu", 
            "filled": [], 
            "interests": ["Population Genetics", "Human Evolution", "Computational Biology", "Machine Learning"], 
            "name": "Xinjun Zhang", 
            "scholar_id": "ZPtvttkAAAAJ", 
            "source": "SEARCH_AUTHOR_SNIPPETS", 
            "url_picture": "https://scholar.google.com/citations?view_op=medium_photo&user=ZPtvttkAAAAJ"
        }, 
        "sfKGE2QAAAAJ": {
            "affiliation": "Indiana University Bloomington", 
            "citedby": 1942, 
            "container_type": "Author", 
            "email_domain": "@indiana.edu", 
            "filled": [], 
            "interests": [], 
            "name": "Xinjun Zhang", 
            "scholar_id": "sfKGE2QAAAAJ", 
            "source": "SEARCH_AUTHOR_SNIPPETS", 
            "url_picture": "https://scholar.google.com/citations?view_op=medium_photo&user=sfKGE2QAAAAJ"
        }
    }


    const runSearch = async () => {

        pmcSearchResults(currentSearch)
        .then((results) => {
            setSearchData(results)
            setDisplayResults(true)
        })

    }


    return (
        <View style={styles.view}>
            <BlurView intensity={10} tint="light" style={styles.top}>
                <VSSearchBar setCurrentSearch={setCurrentSearch} currentSearch={currentSearch} runSearch={runSearch}/>
            </BlurView>
            {
                !displayResults ? <VSSearchRecommendations setCurrentSearch={setCurrentSearch}/>
                : <VSSearchResultsView data={Object.values(searchData)} navigation={navigation} />
            }
            
        </View>
)
}

const Stack = createNativeStackNavigator();
const VSSearchView = ({children}) => {
    return (
        <Stack.Navigator screenOptions={
            {
                headerStyle: styles.stack, 
                headerTitle: (props) => <VSHeaderText {...props} />,
                headerRight: () => (
                    <Image
                        source={require('../assets/SVG/Search.svg')}
                    />
                ),
                headerBackTitleVisible: false,
                headerTintColor: "white"
            }
        }>
            <Stack.Screen name="Search" component={VSSearch}/>
            <Stack.Screen name="Article" component={VSArticleView}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    header: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-end",
        padding: 10,
    },
    top: {
        padding: 10,
        paddingBottom: 0,
    },
    content: {
        flex: 6,
        alignSelf: "stretch",
        backgroundColor: palette.offwhite,
        marginTop: -68,
    },
    stack: {
        backgroundColor: palette.green,
    }
});

export default VSSearchView;