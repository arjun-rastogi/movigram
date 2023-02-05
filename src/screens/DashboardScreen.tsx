import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';

export default function DashboardScreen() {

  const Drawer = createDrawerNavigator();

  return (
    <>
    <Drawer.Navigator initialRouteName='DashboardScreen'>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
    </Drawer.Navigator>
    </>
  );
}

