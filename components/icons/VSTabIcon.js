import { Image, StyleSheet, View } from 'react-native';


const VSTabIcon = ({name, color, size}) => {
    return (
        <View style={styles.icon}>
            <Image></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        flex: 1
    }
});

export default VSTabIcon;