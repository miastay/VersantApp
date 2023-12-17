import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import VSArticleChip from '../components/VSArticleChip';

const VSInfiniteScroll = ({content, children, navigation}) => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
        setRefreshing(false);
        }, 1000);
    }, []);

    data = [
        { 
            article_id: 0,
            category: "Pediatrics",
            header: "Tight Glycemic Control, Inflammation, and the ICU: Evidence for Heterogeneous Treatment Effects in Two Randomized Controlled Trials",
            authors: "Matt S. Zinter, Daniela Markovic, Lisa A. Asaro, Vinay M. Nadkarni, Patrick S. McQuillen, Pratik Sinha, Michael A. Matthay,Marc G. Jeschke, Michael S. D. Agus, and Anil Sapru",
            abstract: "Among critically ill patients, hyperglycemia is associated with insulin resistance, inflammation, endothelial activation, and mortality (1, 2). Although early trials of tight glycemic control (TGC) in critically ill patients showed significant clinical benefit, later trials have shown conflicting results (3, 4). This may be due to a variety of cohort compositions, different tested glucose targets, narrowing glycemic differences between treated and control patients, and other factors which have together led to difficulty in selecting ideal candidates for"
        },
        { 
            article_id: 1,
            category: "Bioinformatics",
            header: "Tight Flycemic Control, Inflammation, and the ICU: Evidence for Heterogeneous Treatment Effects in Two Randomized Controlled Trials",
        }
    ]

    return (
        <SafeAreaView style={styles.container}>
            <FlatList style={styles.view} data={data} keyExtractor={item => item.article_id} 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                renderItem={
                    ({item}) => <VSArticleChip data={item} navigation={navigation}/>
                }>
            </FlatList>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        height: "100%"
    },
    view: {
        padding: 20,
        gap: 20
    }
});

export default VSInfiniteScroll;