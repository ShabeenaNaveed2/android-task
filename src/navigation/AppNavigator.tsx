import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import QRScanner from '../screens/QRScreen/QRScreen';

const Stack = createNativeStackNavigator();
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="QRScanner" component={QRScanner} options={{ title: 'Scan QR' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
