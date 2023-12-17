import { StyleSheet, Text } from 'react-native';
import { useState } from 'react';
import VSBodyText from './VSBodyText';


const VSAbstractText = ({children}) => {

    const maxAbstractCharacterCount = 300;
    const [truncatedText, setTruncatedText] = useState(children.length > maxAbstractCharacterCount ? truncateToSpace(children) + "..." : children)

    function truncateToSpace(str) {
        let truncIndex = str.substring(0, maxAbstractCharacterCount).lastIndexOf(' ')
        return str.substring(0, truncIndex)
    }

    return (
        <VSBodyText size={18}>{truncatedText ?? "No abstract is available."}</VSBodyText>
    )
}

export default VSAbstractText;