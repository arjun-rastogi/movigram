import { View, Dimensions, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { baseImagePath, getNowPlayinges } from "../services/movieService";
import FeaturedNowPlaying from "../common/FeaturedNowPlaying";
import CategoryHeader from "../common/CategoryHeader";
import { Movie } from "../types/MovieType";

const { width } = Dimensions.get("window");

const NowPlaying = () => {
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

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  emptyCard: {
    width: (width - width * 0.7) / 2,
  },
});

export default NowPlaying;
