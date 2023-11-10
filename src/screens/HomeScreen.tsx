import React, { useLayoutEffect } from "react";
import { View, StyleSheet, StatusBar, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../common/constant";
import NowPlaying from "./../components/NowPlaying";
import MostPopular from "./../components/MostPopular";
import UpcomingMovie from "../components/UpcomingMovie";

export default function HomeScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <>
      <ScrollView style={styles.homeContainer} bounces={false}>
        <StatusBar />
        <View className="flex-row pt-3 items-center mx-4 space-x-2">
          <Image
            source={require("../assets/images/app-logo.png")}
            className="h-7 w-7 bg-grey-300 p-4 rounded-full"
          />
        </View>
        {/* Now Playing */}
        <NowPlaying />
        {/* Most Popular */}
        <MostPopular />
        {/* Upcoming Movies */}
        <UpcomingMovie />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    display: "flex",
    backgroundColor: COLORS.Black,
  },
});
