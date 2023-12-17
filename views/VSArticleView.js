import { StyleSheet, View } from 'react-native';


const VSArticleView = ({children}) => {
    return (
        <View style={styles.view}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1
    }
});

export default VSArticleView;