import React, { useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import SearchScreen from "./SearchScreen";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const DashboardScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <View style={{ marginLeft: 10 }}>
              <Icon name="home" size={25} color={color} type="font-awesome" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <View style={{ marginLeft: 10 }}>
              <Icon name="search" size={25} color={color} type="font-awesome" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <View style={{ marginLeft: 10 }}>
              <Icon name="user" size={25} color={color} type="font-awesome" />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
