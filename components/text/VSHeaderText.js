import { StyleSheet, Text } from 'react-native';
import * as Font from 'expo-font';

const VSHeaderText = ({children}) => {
    return (
        <Text style={children == "Versant" ? styles.versant : styles.text}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    versant: {
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: -1,
        color: "white",
        fontFamily: "DMSerifDisplay-Regular"
    },
    text: {
        fontSize: 25,
        fontWeight: 700,
        letterSpacing: -1,
        color: "white",
        fontFamily: "DMSans-Medium"
    },
});

export default VSHeaderText;
