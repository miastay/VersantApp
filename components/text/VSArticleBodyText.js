import { useState } from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';


const VSArticleBodyText = ({children, size, color, styled}) => {

    const [text, setText] = useState(children)

    const handleSelection = (e) => {
        let offset = e.nativeEvent.selection
        console.log(e.nativeEvent)
        console.log(children.substring(offset.start, offset.end))
        //console.log("new selection " + children.substring(e.nativeEvent.contentOffset.x, e.nativeEvent.contentOffset.y))
    }

    return (
        <TextInput onSelectionChange={handleSelection} editable={false} selectable={true} scrollEnabled={false} multiline={true} selectionColor='orange' style={{...styles.text, fontSize: size, color: color, ...styled}}>{children}</TextInput>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: 400,
        letterSpacing: 0,
        color: "black",
        fontFamily: "RobotoSlab",
    },
});

export default VSArticleBodyText;
