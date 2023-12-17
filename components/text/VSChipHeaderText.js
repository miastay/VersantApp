import { StyleSheet, Text } from 'react-native';
import { useState } from 'react';

const VSChipHeaderText = ({children}) => {

    const maxChipHeaderLength = 150;
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
        fontSize: 25,
        fontWeight: 900,
        letterSpacing: -1,
        color: "black",
        fontFamily: "DMSans-Black"
    },
});

export default VSChipHeaderText;