import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, UIManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


import { palette } from './assets/palette';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Home from './views/home';
import VSHeaderText from './components/text/VSHeaderText';
import VSArticleView from './views/VSArticleView';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VSHomeView from './views/VSHomeView';
import VSSearchView from './views/VSSearchView';

import { FontAwesome5 } from '@expo/vector-icons'; 
import VSProfileView from './views/VSProfileView';


const Tab = createBottomTabNavigator();

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
            "RobotoSlab": require('./assets/fonts/RobotoSlab.ttf'),
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

    if (
        Platform.OS === 'android' &&
        UIManager.setLayoutAnimationEnabledExperimental
      ) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ 
                headerShown: false, 
                tabBarStyle: {backgroundColor: palette.lightgray}, 
                tabBarShowLabel: false,
            }}>
                <Tab.Screen name="Home" component={VSHomeView} options={{tabBarIcon: ({ focused }) => (
                    focused ? <FontAwesome5 name="home" size={24} color="black" /> : <FontAwesome5 name="home" size={24} color={palette.medgray} />
                )}}/>
                <Tab.Screen name="VSSearch" component={VSSearchView} options={{tabBarIcon: ({ focused }) => (
                    focused ? <FontAwesome5 name="search" size={24} color="black" /> : <FontAwesome5 name="search" size={24} color={palette.medgray} />
                )}}/>
                <Tab.Screen name="VSUser" component={VSProfileView} options={{tabBarIcon: ({ focused }) => (
                    focused ? <FontAwesome5 name="user-alt" size={24} color="black" /> : <FontAwesome5 name="user-alt" size={24} color={palette.medgray} />
                )}}/>
            </Tab.Navigator>
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
