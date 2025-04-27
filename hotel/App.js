import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';
import RoomListScreen from './src/screens/RoomListScreen';
import RoomDetailScreen from './src/screens/RoomDetailScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Rooms" component={RoomListScreen} />
        <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}