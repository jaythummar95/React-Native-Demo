import React, { Component } from 'react';
import { YellowBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

import Splash from "./src/screens/Splash";
import Authantication from "./src/screens/Authantication";
import OTPVerification from "./src/screens/OTPVerification";
import Dash from "./src/screens/Dash";
import MyAccount from "./src/screens/MyAccount";
import OrderDetail from "./src/screens/OrderDetail";
import OrderTracker from "./src/screens/OrderDetail/OrderTracker";
import Webcontent from "./src/screens/Webcontent";


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Authantication" component={Authantication} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="Dash" component={Dash} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
        <Stack.Screen name="OrderTracker" component={OrderTracker} />
        <Stack.Screen name="Webcontent" component={Webcontent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
