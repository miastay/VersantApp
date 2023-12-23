import { StyleSheet, TextInput, View } from 'react-native';
import { palette } from '../assets/palette';
import { Ionicons } from '@expo/vector-icons';

const VSSearchBar = ({children, setCurrentSearch, currentSearch, runSearch, setDisplayResults}) => {

    const handleChangeText = async (e) => {
        setCurrentSearch(e)
        if(e === "") {
            setDisplayResults(false)
        }
    }

    const handleBlur = async (e) => {
        runSearch(e.nativeEvent.text)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={"Search articles, authors, categories..."}
                onChangeText={handleChangeText}
                onBlur={handleBlur}
                value={currentSearch}
                clearButtonMode={"always"}
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