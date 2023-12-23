import { ScrollView, StyleSheet, Text, View } from 'react-native';
import VSBodyText from '../components/text/VSBodyText';
import { useEffect, useState } from 'react';
import VSChipCategoryText from '../components/text/VSChipCategoryText';
import VSChipHeaderText from '../components/text/VSChipHeaderText';
import VSChipAuthorListText from '../components/text/VSChipAuthorListText';
import VSAbstractText from '../components/text/VSAbstractText';
import { GestureDetector } from 'react-native-gesture-handler';
import VSArticleHeaderText from '../components/text/VSArticleHeaderText';
import VSArticleAuthorListText from '../components/text/VSArticleAuthorListText';
import VSArticleCategoryText from '../components/text/VSArticleCategoryText';
import VSArticleBodyText from '../components/text/VSArticleBodyText';
import { pmcIdToArticleFetch } from '../api/entrez';
import { palette } from '../assets/palette';


const VSArticleView = ({ children, route, navigation }) => {

    const [ prefetched, setPrefetched ] = useState(route.params)
    const [ articleData, setArticleData ] = useState(null)

    useEffect(() => {
        pmcIdToArticleFetch(route.params.id)
        .then((result) => setArticleData(result))
        console.log(route.params.authors)

        // generate


    }, [])

    let tap = null;

    return (
        <ScrollView style={styles.view}>
            <View style={styles.inner}>
                <View style={styles.category}>
                    {prefetched.category && <VSArticleCategoryText navigation={navigation}>{prefetched.category}</VSArticleCategoryText>}
                </View>
                <View style={styles.content}>
                    <View style={styles.header}>
                        {prefetched.header && <VSArticleHeaderText>{prefetched.header}</VSArticleHeaderText>}
                    </View>
                    <View style={styles.authors}>
                        {prefetched.authors && <VSArticleAuthorListText>{prefetched.authors.split(',').join(', ')}</VSArticleAuthorListText>}
                    </View>
                    <View>
                        {prefetched.abstract && <VSArticleBodyText>{prefetched.abstract}</VSArticleBodyText>}
                    </View>
                </View>
            </View>
            {articleData && 
            <View style={styles.abstract}>
                <Text style={styles.abstract.header}>Abstract</Text>
                <VSArticleBodyText>{JSON.stringify(articleData["Abstract"]["AbstractText"])}</VSArticleBodyText>
            </View>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 10,
    },
    inner: {
        paddingBottom: 30,
        borderBottomColor: palette.lightgreen,
        borderBottomWidth: 8
    },
    abstract: {
        paddingTop: 10,
        paddingBottom: 100,
        header: {
            fontSize: 20,
            letterSpacing: -1,
            fontFamily: "DMSans-Bold",
            color: "black"
        }
    },
    category: {
        marginBottom: 6
    },
    content: {
        gap: 5,
    }
});

export default VSArticleView;