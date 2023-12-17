import { StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { palette } from '../../assets/palette';

const VSChipAuthorListText = ({children}) => {

    const [truncatedText, setTruncatedText] = useState(truncateAuthorList(children))
    const numAuthorsDisplayed = 3;

    function truncateAuthorList(str) {
        if(!str) return "";
        return str.split(',').slice(0, 3).join(', ') + ' et al.'
    }

    return (
        <Text style={styles.text}>{truncatedText}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        fontWeight: 900,
        letterSpacing: -1,
        color: palette.text.authors,
        fontFamily: "DMSans-BoldItalic",
    },
});

export default VSChipAuthorListText;