import { StyleSheet, TextInput, View } from 'react-native';
import { palette } from '../assets/palette';


const VSSearchBar = ({children, setCurrentSearch, currentSearch, runSearch}) => {

    const handleChangeText = async (e) => {
        setCurrentSearch(e)
    }

    const handleBlur = async (e) => {
        runSearch(e)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={"Search articles, authors, categories..."}
                onChangeText={handleChangeText}
                onBlur={handleBlur}
                value={currentSearch}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15
    },
    input: {
        backgroundColor: palette.lightgray,
        color: palette.darkgray,
        padding: 15,
        borderRadius: 8,
        fontSize: 18
    }
});

export default VSSearchBar;