import { StyleSheet, Text } from 'react-native';
import { useState } from 'react';

const VSChipHeaderText = ({children}) => {

    const maxChipHeaderLength = 200;
    const [truncatedText, setTruncatedText] = useState(children.length > maxChipHeaderLength ? truncateToSpace(children) + "..." : children)


    function truncateToSpace(str) {
        let truncIndex = str.substring(0, maxChipHeaderLength).lastIndexOf(' ')
        return str.substring(0, truncIndex)
    }


    return (
        <Text style={styles.text}>{truncatedText}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        fontWeight: 900,
        letterSpacing: -1,
        color: "black",
        fontFamily: "DMSans-Black",
        marginTop: 2,
        lineHeight: 26
    },
});

export default VSChipHeaderText;