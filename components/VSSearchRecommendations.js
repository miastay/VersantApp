import { SectionList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { palette } from '../assets/palette';
import { useState } from 'react';


const VSSearchRecommendations = ({children, setCurrentSearch}) => {

    data = [
        {
            title: "Recent searches",
            data: ["Anil Sapru", "ARDS", "Phenotype association"]
        },
        {
            title: "Popular",
            data: ["Sickle cell anemia", "Nature", "New England Journal of Medicine", "Transcriptome analysis"]
        }
    ]

    //onPress={() => {setCurrentSearch(item)}}

    return (
        <View style={styles.view}>
            <SectionList
                sections={data}
                keyExtractor={(item, index) => item + index}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => {setCurrentSearch(item)}}>
                            <Text style={styles.title}>{item}</Text>
                        </TouchableOpacity>
                    </View>
                )}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 20
    },
    item: {
        marginBottom: 5,
        padding: 5,
        paddingLeft: 15,
    },
    title: {
        fontSize: 15,
    },
    header: {
        fontSize: 18,
        color: palette.lightgreen,
        fontFamily: "DMSans-Bold",
        marginBottom: 10,
        marginTop: 10
    }
});

export default VSSearchRecommendations;