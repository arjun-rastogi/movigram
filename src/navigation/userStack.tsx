import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DashboardScreen from './../screens/DashboardScreen';

const Stack = createStackNavigator();
import 'react-native-gesture-handler';
import EditProfileScreen from '../screens/EditProfileScreen';

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}