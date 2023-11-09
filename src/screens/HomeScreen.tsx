import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { baseImagePath, getNowPlayinges } from "../services/movieService";
import FeaturedNowPlaying from "../common/FeaturedNowPlaying";
import CategoryHeader from "../common/CategoryHeader";

const { width, height } = Dimensions.get("window");

interface Movie {
  id: number;
  original_title: string;
  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  poster_path: string;
}

export default function HomeScreen() {
  const [featuredNowPlaying, setFeaturedNowPlaying] = useState<Movie[]>([]);

  const fetchData = async () => {
    try {
      const response = await getNowPlayinges();
      const results: Movie[] = response.data.results;
      setFeaturedNowPlaying(results);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.homeContainer} className="bg-black pt-5 flex-1">
      <View className="flex-row pt-3 items-center mx-4 space-x-2">
        <Image
          source={require("../assets/images/app-logo.png")}
          className="h-7 w-7 bg-grey-300 p-4 rounded-full"
        />
      </View>
      {/* Now Playing */}
      <CategoryHeader title={"Now Playing"} />

      <FlatList
        className="pt-5 mx-4"
        data={featuredNowPlaying}
        keyExtractor={(item) => item?.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          if (!item.original_title) {
            return <View style={styles.emptyCard}></View>;
          }
          return (
            <FeaturedNowPlaying
              // cardFunction={() => {
              //   navigation.navigate('MovieDetails', {  item.id });
              // }}
              cardWidth={width * 0.6}
              isFirst={index === 0}
              isLast={index === featuredNowPlaying.length - 1}
              title={item.original_title}
              imagePath={baseImagePath("w780", item.poster_path)}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
  },

  emptyCard: {
    width: (width - width * 0.7) / 2,
  },
});
