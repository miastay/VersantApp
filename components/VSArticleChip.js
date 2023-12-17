import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import VSChipHeaderText from './text/VSChipHeaderText';
import VSChipCategoryText from './text/VSChipCategoryText';
import VSChipAuthorListText from './text/VSChipAuthorListText';
import VSBodyText from './text/VSBodyText';
import VSAbstractText from './text/VSAbstractText';

const VSArticleChip = ({children, data, navigation}) => {
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Article')}>
            <View style={styles.chip}>
                <View style={styles.category}>
                    {data.category && <VSChipCategoryText navigation={navigation}>{data.category}</VSChipCategoryText>}
                </View>
                <View style={styles.header}>
                    {data.header && <VSChipHeaderText>{data.header}</VSChipHeaderText>}
                </View>
                <View style={styles.authors}>
                    {data.authors && <VSChipAuthorListText>{data.authors}</VSChipAuthorListText>}
                </View>
                <View>
                    {data.abstract && <VSAbstractText>{data.abstract}</VSAbstractText>}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    chip: {
        flex: 1,
        flexDirection: "column",
        rowGap: 4,
        backgroundColor: "white",
        padding: 15,
        shadowColor: "#222222",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 0
        },
        borderRadius: 8,
        minHeight: "100%",
        height: "100%",
    },
    header: {

    },
    category: {

    },
    authors: {
        marginBottom: 20
    }
});

export default VSArticleChip;