import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { palette } from './assets/palette';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Home from './views/home';
import VSHeaderText from './components/text/VSHeaderText';
import VSArticleView from './views/VSArticleView';

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {

    let [fontsLoaded, setFontsLoaded] = useState(false);

    const fetchFonts = async () => {
        await Font.loadAsync({
            'DMSerifDisplay-Regular': require('./assets/fonts/DMSerifDisplay-Regular.ttf'),
            'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
            'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
            'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
            'DMSans-BoldItalic': require('./assets/fonts/DMSans-BoldItalic.ttf'),
            'DMSans-Black': require('./assets/fonts/DMSans-Black.ttf'),
            'DMSans': require('./assets/fonts/DMSans.ttf'),
            'DMSansItalic': require('./assets/fonts/DMSansItalic.ttf'),
        });
        console.log("loaded fonts")
    }
    fetchFonts().then(() => {
        console.log("loaded font!!")
        setFontsLoaded(true);
        SplashScreen.hideAsync();
    }).catch((err) => console.log(err))
    //setTimeout(SplashScreen.hideAsync, 2000);
    if(!fontsLoaded) return false;

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={
                    {
                        headerStyle: styles.stack, 
                        headerTitle: (props) => <VSHeaderText {...props} />,
                        headerRight: () => (
                            <Image
                                source={require('./assets/SVG/Search.svg')}
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
        </NavigationContainer>
    );
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
