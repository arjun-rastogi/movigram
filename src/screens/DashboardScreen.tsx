import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

export default function DashboardScreen() {

  const Drawer = createDrawerNavigator();

  return (
    <>
    <Drawer.Navigator initialRouteName='DashboardScreen'>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
    </>
  );
}

