import { StyleSheet, Text } from 'react-native';
import { useState } from 'react';

const VSArticleHeaderText = ({children, addStyle}) => {

    const maxChipHeaderLength = 200;

    return (
        <Text style={{ ...styles.text, ...addStyle}}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        fontWeight: 900,
        letterSpacing: -1,
        color: "black",
        fontFamily: "DMSans-Black",
        marginTop: 2,
        lineHeight: 30
    },
});

export default VSArticleHeaderText;