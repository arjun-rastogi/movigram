import { View, Dimensions, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { baseImagePath, getSearch } from "../services/movieService";
import { Movie } from "../types/MovieType";
import { SPACING } from "../common/constant";
import InputHeader from "../common/InputHeader";
import MovieCard from "../common/MovieCard";
const { width } = Dimensions.get("window");

const SearchMovie = () => {
  const [searchList, setSearchList] = useState<Movie[]>([]);
  const fetchData = async (name: string) => {
    try {
      const response = await getSearch(name);
      const results: Movie[] = response.data.results;
      setSearchList(results);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  return (
    <>
      <FlatList
        className="pt-5 mx-4"
        data={searchList}
        keyExtractor={(item) => item?.id.toString()}
        bounces={false}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.InputHeaderContainer}>
            <InputHeader searchFunction={fetchData} />
          </View>
        }
        contentContainerStyle={styles.centerContainer}
        renderItem={({ item, index }) => {
          if (!item.original_title) {
            return <View style={styles.emptyCard}></View>;
          }
          return (
            <MovieCard
              // cardFunction={() => {
              //   navigation.navigate('MovieDetails', {  item.id });
              // }}
              cardWidth={width * 0.6}
              isFirst={index === 0}
              isLast={index === searchList.length - 1}
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
  InputHeaderContainer: {
    display: "flex",
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
    marginBottom: SPACING.space_28 - SPACING.space_12,
  },
  centerContainer: {
    alignItems: "center",
  },
});
export default SearchMovie;
