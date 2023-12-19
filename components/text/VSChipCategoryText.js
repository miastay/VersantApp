import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { palette } from '../../assets/palette';

const VSChipCategoryText = ({children, navigation}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Category')}>
            <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 13,
        fontWeight: 900,
        letterSpacing: -0.5,
        color: palette.text.category,
        fontFamily: "DMSans-Black",
        textTransform: "uppercase"
    },
});

export default VSChipCategoryText;