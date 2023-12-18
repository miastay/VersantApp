import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
import VSInfiniteScroll from './VSInfiniteScroll';
import VSArticleChip from '../components/VSArticleChip';
import { palette } from '../assets/palette';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Home({navigation}) {
    return (
        <GestureHandlerRootView style={styles.home}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.content}>
                <VSInfiniteScroll navigation={navigation}></VSInfiniteScroll>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    home: {
        flex: 1, 
        alignSelf: 'stretch',
    },
    header: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "flex-end",
        padding: 10,
    },
    content: {
        flex: 6,
        alignSelf: "stretch",
        backgroundColor: palette.offwhite,
        marginTop: -68,
    },
});