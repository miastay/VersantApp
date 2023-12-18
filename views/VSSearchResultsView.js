import { FlatList, StyleSheet, View, Text } from 'react-native';
import { palette } from '../assets/palette';
import VSBodyText from '../components/text/VSBodyText';
import VSChipHeaderText from '../components/text/VSChipHeaderText';


const VSSearchResultItem = ({data, navigation}) => {
    return (
        <View style={styles.item}>
            <VSBodyText size={20}>{data.scholar_id}aaa</VSBodyText>
        </View>
    )
}

const VSSearchResultAuthorItem = ({data, navigation}) => {
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

    //if(!data) return false;
    console.log(data)

    return (
        <View style={styles.view}>
            <FlatList style={styles.list} data={data} keyExtractor={item => item.scholar_id} 
                renderItem={
                    ({item}) => {
                        switch(item.container_type) {
                            case "Author": { return <VSSearchResultAuthorItem data={item} navigation={navigation}/>}
                            default: { return <VSSearchResultItem data={item} navigation={navigation}/>}
                        }
                    }
                }
                onEndThreshold={0}
            >
            </FlatList>
        </View>
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