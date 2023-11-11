import { View, Dimensions, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { baseImagePath, getNowPlayinges } from "../services/movieService";
import FeaturedNowPlaying from "../common/FeaturedNowPlaying";
import CategoryHeader from "../common/CategoryHeader";
import { Movie } from "../types/MovieType";
const { width } = Dimensions.get("window");

const NowPlaying = (props: any) => {
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

  const renderFeaturedItem = ({
    item,
    index,
  }: {
    item: Movie;
    index: number;
  }) => {
    if (!item.original_title) {
      return <View style={styles.emptyCard} />;
    }
    return (
      <FeaturedNowPlaying
        cardFunction={() => {
          props.navigation.navigate("MovieDetailScreen", { id: item.id });
        }}
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
  };

  return (
    <>
      <CategoryHeader title={"Now Playing"} />

      <FlatList
        style={{ paddingTop: 5, marginHorizontal: 4 }}
        data={featuredNowPlaying}
        keyExtractor={(item) => item?.id.toString() ?? ""}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderFeaturedItem}
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
