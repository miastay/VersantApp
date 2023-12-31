import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import VSArticleChip from '../components/VSArticleChip';
import VSBodyText from '../components/text/VSBodyText';
import { palette } from '../assets/palette';
import { pmcSearchToXML } from '../api/entrez';
import { getUser, getUsers } from '../api/firebase';

const VSInfiniteScroll = ({content, children, navigation}) => {

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getUser('akiak', false).then((user) => console.log(JSON.stringify(user)))
        setTimeout(() => {
        setRefreshing(false);
        }, 1000);
    }, []);

    data = [
        { 
            id: 0,
            category: "Pediatrics",
            header: "Tight Glycemic Control, Inflammation, and the ICU: Evidence for Heterogeneous Treatment Effects in Two Randomized Controlled Trials",
            authors: "Matt S. Zinter, Daniela Markovic, Lisa A. Asaro, Vinay M. Nadkarni, Patrick S. McQuillen, Pratik Sinha, Michael A. Matthay,Marc G. Jeschke, Michael S. D. Agus, and Anil Sapru",
            abstract: "Among critically ill patients, hyperglycemia is associated with insulin resistance, inflammation, endothelial activation, and mortality (1, 2). Although early trials of tight glycemic control (TGC) in critically ill patients showed significant clinical benefit, later trials have shown conflicting results (3, 4). This may be due to a variety of cohort compositions, different tested glucose targets, narrowing glycemic differences between treated and control patients, and other factors which have together led to difficulty in selecting ideal candidates for"
        },
        { 
            id: 1,
            category: "Machine Learning",
            header: "Machine Learning Classifier Models Can Identify Acute Respiratory Distress Syndrome Phenotypes Using Readily Available Clinical Data ",
            authors: "Pratik Sinha, Matthew M. Churpek, and Carolyn S. Calfee",
            abstract: "Rationale: Two distinct phenotypes of acute respiratory distress syndrome (ARDS) with differential clinical outcomes and responses to randomly assigned treatment have consistently been identified in randomized controlled trial cohorts using latent class analysis. Plasma biomarkers, key components in phenotype identification, currently lack point-of-care assays and represent a barrier to the clinical implementation of phenotypes."
        },
    ]

    const handleLoadMore = async () => {
        console.log("reached end");
        data.push(
            { 
                id: data.length,
                category: "Pediatrics",
                header: "Tight Glycemic Control, Inflammation, and the ICU: Evidence for Heterogeneous Treatment Effects in Two Randomized Controlled Trials",
                authors: "Matt S. Zinter, Daniela Markovic, Lisa A. Asaro, Vinay M. Nadkarni, Patrick S. McQuillen, Pratik Sinha, Michael A. Matthay,Marc G. Jeschke, Michael S. D. Agus, and Anil Sapru",
                abstract: "Among critically ill patients, hyperglycemia is associated with insulin resistance, inflammation, endothelial activation, and mortality (1, 2). Although early trials of tight glycemic control (TGC) in critically ill patients showed significant clinical benefit, later trials have shown conflicting results (3, 4). This may be due to a variety of cohort compositions, different tested glucose targets, narrowing glycemic differences between treated and control patients, and other factors which have together led to difficulty in selecting ideal candidates for"
            },
        )
        //console.log(xml["eSearchResult"][IdList])
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList style={styles.view} data={data} keyExtractor={item => item.id} 
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={palette.lightgreen} colors={[palette.lightgreen]}/>
                }
                renderItem={
                    ({item}) => <VSArticleChip data={item} navigation={navigation}/>
                }
                onEndReached={handleLoadMore}
                onEndThreshold={0}
                ListFooterComponent={
                    <InfiniteFooter />
                }
            >
            </FlatList>
        </SafeAreaView>
    )
}


const InfiniteFooter = () => {
    return (
        <View style={styles.footer}>
            <ActivityIndicator size="small" color={palette.green}/>
            <VSBodyText size={15} color={palette.medgray}>Loading more articles...</VSBodyText>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        paddingTop: 20,
        paddingBottom: -100
    },
    view: {
        padding: 0,
        paddingTop: 10,
    },
    footer: {
        minHeight: 50,
        padding: 10,
        gap: 5,
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10
    }
});

export default VSInfiniteScroll;