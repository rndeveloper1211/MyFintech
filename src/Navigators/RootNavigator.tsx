import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../DashBoard/HomeScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right', // Sahi value ye hai
      }}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;