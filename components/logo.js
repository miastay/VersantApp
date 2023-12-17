import { StyleSheet, Image, View } from 'react-native';

const Logo = ({}) => {
    return (
        <View style={styles.container}>
            {/* <Image source={require('../assets/icon.png')} style={styles.image}/> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignSelf: 'stretch',
        backgroundColor: 'red'
    },
});

export default Logo;
