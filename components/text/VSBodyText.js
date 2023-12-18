import { StyleSheet, Text } from 'react-native';


const VSBodyText = ({children, size, color, styled}) => {
    return (
        <Text style={{...styles.text, fontSize: size, color: color, ...styled}}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: 700,
        letterSpacing: -1,
        color: "black",
        fontFamily: "DMSans-Regular"
    },
});

export default VSBodyText;