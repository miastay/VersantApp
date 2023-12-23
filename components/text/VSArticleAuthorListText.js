import { StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import { palette } from '../../assets/palette';

const VSArticleAuthorListText = ({children}) => {

    return (
        <Text style={styles.text}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: 900,
        letterSpacing: -1,
        color: palette.text.authors,
        fontFamily: "DMSans-BoldItalic",
    },
});

export default VSArticleAuthorListText;