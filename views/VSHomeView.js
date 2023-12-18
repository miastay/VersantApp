import { StyleSheet, View, Image } from 'react-native';
import Home from './home';
import VSArticleView from './VSArticleView';
import { palette } from '../assets/palette';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VSHeaderText from '../components/text/VSHeaderText';

const Stack = createNativeStackNavigator();
const VSHomeView = ({children}) => {
    return (
        <Stack.Navigator screenOptions={
                {
                    headerStyle: styles.stack, 
                    headerTitle: (props) => <VSHeaderText {...props} />,
                    headerRight: () => (
                        <Image
                            source={require('../assets/SVG/Search.svg')}
                        />
                    ),
                    headerBackTitleVisible: false,
                    headerTintColor: "white"
                }
            }>
            <Stack.Screen name="Versant" component={Home}/>
            <Stack.Screen name="Article" component={VSArticleView}/>
            <Stack.Screen name="Category" component={VSArticleView}/>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    stack: {
      backgroundColor: palette.green,
    }
});

export default VSHomeView;