import { StyleSheet, View, Image } from 'react-native';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VSHeaderText from '../components/text/VSHeaderText';
import { palette } from '../assets/palette';


const VSProfile = ({children}) => {

    return (
        <View style={styles.view}>
            {children}
        </View>
    )
    
}


const Stack = createNativeStackNavigator();
const VSProfileView = ({children}) => {

    return (
        <Stack.Navigator screenOptions={
            {
                headerStyle: styles.stack, 
                headerTitle: (props) => <VSHeaderText {...props} />,
                headerBackTitleVisible: false,
                headerTintColor: "white"
            }
        }>
            <Stack.Screen name="Profile" component={VSProfile}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        padding: 20
    },
    stack: {
        backgroundColor: palette.green,
    }
});

export default VSProfileView;