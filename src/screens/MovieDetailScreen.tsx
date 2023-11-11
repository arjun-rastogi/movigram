import React, { useLayoutEffect, useState, useEffect } from "react";
import { ScrollView, StyleSheet, StatusBar } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { getCastDetails, getMovieDetails } from "../services/movieService";
import MovieDetails from "../components/MovieDetails";
import CastDetails from "../components/CastDetails";
import { COLORS } from "../common/constant";
import SimilarMovies from "./../components/SimilarMovies";
type RootStackParamList = {
  MovieDetail: { id: number };
};

type MovieDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MovieDetail"
>;
type MovieDetailScreenRouteProp = RouteProp<RootStackParamList, "MovieDetail">;

type Props = {
  navigation: MovieDetailScreenNavigationProp;
  route: MovieDetailScreenRouteProp;
};

const MovieDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const [movieData, setMovieData] = useState<any>(undefined);
  const [movieCastData, setMovieCastData] = useState<any>(undefined);

  const fetchMoviesData = async (id: number) => {
    try {
      const response = await getMovieDetails(String(id));
      const results: any = response.data;
      setMovieData(results);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };
  const fetchMovieCastData = async (id: number) => {
    try {
      const response = await getCastDetails(String(id));
      const results: any = response.data.cast;
      setMovieCastData(results);
    } catch (error) {
      console.error("Error fetching movie cast list:", error);
    }
  };

  useEffect(() => {
    if (route.params.id) fetchMoviesData(route.params.id);
  }, [route.params.id]);
  useEffect(() => {
    if (route.params.id) fetchMovieCastData(route.params.id);
  }, [route.params.id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <MovieDetails movieData={movieData} />
      <CastDetails movieCastData={movieCastData} />
      <SimilarMovies id={route.params.id} navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
});
export default MovieDetailScreen;
