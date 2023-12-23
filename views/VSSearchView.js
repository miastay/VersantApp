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


    const runSearch = async (str) => {

        pmcSearchResults(str)
        .then((results) => {
            setSearchData(results)
            setDisplayResults(true)
        })

    }

    const updateSearchFromRecommendations = (str) => {
        setCurrentSearch(str);
        runSearch(str);
    }


    return (
        <View style={styles.view}>
            <BlurView intensity={10} tint="light" style={styles.top}>
                <VSSearchBar setCurrentSearch={setCurrentSearch} currentSearch={currentSearch} runSearch={runSearch} setDisplayResults={setDisplayResults}/>
            </BlurView>
            {
                !displayResults ? <VSSearchRecommendations setCurrentSearch={updateSearchFromRecommendations}/>
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