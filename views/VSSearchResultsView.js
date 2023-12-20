import { FlatList, StyleSheet, View, Text } from 'react-native';
import { palette } from '../assets/palette';
import VSBodyText from '../components/text/VSBodyText';
import VSChipHeaderText from '../components/text/VSChipHeaderText';
import VSArticleChip from '../components/VSArticleChip';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useRef } from 'react';
import VSAuthorChip from '../components/VSAuthorChip';


const VSSearchResultItem = ({data, navigation}) => {
    return (
        <View style={styles.item}>
            <VSBodyText size={20}>{JSON.stringify(data.id)}</VSBodyText>
            <VSBodyText size={20}>{JSON.stringify(data.title)}</VSBodyText>
            <VSBodyText size={20}>{JSON.stringify(data.title)}</VSBodyText>
        </View>
    )
}

const VSSearchResultAuthorItem = ({data, navigation}) => {

    console.log(data)

    return (
        <View style={styles.item}>
            <Text style={styles.item.header}>{data.name}</Text>
            <Text style={styles.item.subheader}>{data.affiliation}</Text>
            <View style={styles.item.interests}>
                <FlatList data={data.interests}
                    renderItem={
                        ({interest}) => {
                            return <Text>{interest}</Text>
                        }
                    }
                >
                </FlatList>
            </View>
        </View>
    )
}


const VSSearchResultsView = ({data, navigation}) => {

    let listRef = useRef(null)

    useEffect(() => {
        listRef.current.scrollToOffset({ offset: 0, animated: true })
    }, [data])

    return (
        data && 
        <GestureHandlerRootView style={styles.view}>
            <FlatList style={styles.list} data={data} keyExtractor={item => item.id} 
                ref={listRef}
                renderItem={
                    ({item}) => {
                        switch(item.category) {
                            case "author": { return <VSAuthorChip data={item} navigation={navigation}/>}
                            case "article":
                            default: { return <VSArticleChip data={item} navigation={navigation}/>}
                        }
                    }
                }
                onEndThreshold={0}
            >
            </FlatList>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    item: {
        paddingVertical: 20,
        flex: 1,
        borderTopColor: palette.medgray,
        borderTopWidth: 2,
        header: {
            fontSize: 18,
            fontFamily: "DMSans-Black",
        },
        subheader: {
            fontSize: 15,
            fontFamily: "DMSansItalic",
            fontWeight: 500,
            color: palette.green
        },
        interests: {
            flexDirection: "column",
            flex: 1,
            interest: {
                padding: 2,
                backgroundColor: "red"
            }
        }
    },
});

export default VSSearchResultsView;