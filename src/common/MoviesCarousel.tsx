import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import CategoryHeader from "./CategoryHeader";
import MovieCard from "./MovieCard";
import { Movie } from "../types/MovieType";
import { baseImagePath } from "../services/movieService";

type Props = {
  title: string;
  movies: Movie[];
};

const { width } = Dimensions.get("window");

const MoviesCarousel = (props: Props) => {
  return (
    <>
      <CategoryHeader title={props.title} />
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {props.movies.map((item: any, index: number) => (
          <View className="p-1">
            <MovieCard // cardFunction={() => {
              //   navigation.navigate('MovieDetails', {  item.id });
              // }}
              cardWidth={width * 0.45}
              isFirst={index === 0}
              isLast={index === props.movies.length - 1}
              title={item.original_title}
              imagePath={baseImagePath("w780", item.poster_path)}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          </View>
        ))}
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  emptyCard: {
    width: (width - width * 0.7) / 2,
  },
});

export default MoviesCarousel;
