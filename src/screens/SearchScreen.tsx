import React, { useLayoutEffect } from "react";
import { StyleSheet, StatusBar, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../common/constant";
import SearchMovie from "./../components/SearchMovie";

export default function SearchScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <>
      <ScrollView style={styles.searchContainer} bounces={false}>
        <StatusBar />

        {/* "Search Movie" */}
        <SearchMovie />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    display: "flex",
    backgroundColor: COLORS.Black,
  },
});
