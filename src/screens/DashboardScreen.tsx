import React, { useLayoutEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import { DrawerActions } from "@react-navigation/native";

const DashboardScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const Drawer = createDrawerNavigator();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <>
      <Drawer.Navigator initialRouteName="DashboardScreen">
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <Icon
                  name="bars"
                  size={25}
                  type="font-awesome"
                  color="#777777"
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            headerLeft: () => (
              <View style={{ marginLeft: 10 }}>
                <Icon
                  name="bars"
                  size={25}
                  type="font-awesome"
                  color="#777777"
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                />
              </View>
            ),
            headerRight: () => (
              <View style={{ marginRight: 10 }}>
                <Icon
                  name="edit"
                  size={25}
                  type="font-awesome"
                  color="#777777"
                  onPress={() => navigation.navigate("Edit Profile")}
                />
              </View>
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

export default DashboardScreen;
