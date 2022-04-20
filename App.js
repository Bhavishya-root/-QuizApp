
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DrawerContentScrollView,
  DrawerItemList, DrawerItem
} from '@react-navigation/drawer';

import {
  SafeAreaView, View, Text, Button, StyleSheet
} from 'react-native';



import SplashScreen from './Component/Splash';
import RegisterScreen from './Component/SignUp';
import LoginScreen from './Component/Login';
import ForgotPasswordScreen from './Component/ForgotPasswordScreen';

import Home from './Screens/Home';
import Quiz from './Screens/Quiz';
import Result from './Screens/Result';
import CustomDrawer from './CustomDrawer';
import AnswerKey from './Screens/AnswerKey';
import Logout from './Screens/Logout';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


const App = ({ navigation }) => {
  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  ]);


  const Auth = () => {
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        {/* <Stack.Screen name="Splash" component={Splash} /> */}
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}
          options={{
            title: 'Register', //Set Header Title
            headerShown: false,
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color

            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
              fontSize: 25

            },
            headerTitleAlign: 'center',

          }}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    )
  }

  const DrawerNav = () => {
    return (
      <Drawer.Navigator initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerStyle: { backgroundColor: "#2643B4" }, headerTintColor: "#fff", headerTitleAlign: "center",
          headerTitleStyle: { fontSize: 20, fontWeight: "bold" }
        }} >
        <Drawer.Screen options={{}} name="Home" component={Home} />
        <Drawer.Screen name="Quiz" component={Quiz} />
        <Drawer.Screen name="Result" component={Result} />
        <Drawer.Screen name="AnswerKey" component={AnswerKey} />

      </Drawer.Navigator>

    )
  }


  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="SplashScreen">

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNav"
          component={DrawerNav}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
      </Stack.Navigator>


    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 13
  },

});

export default App;
