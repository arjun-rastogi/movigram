import React, { useEffect, useState } from "react";
import { getSimilarMovies } from "../services/movieService";
import { Movie } from "../types/MovieType";
import MoviesCarousel from "../common/MoviesCarousel";

const SimilarMovies = (props: any) => {
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const fetchData = async (id: number) => {
    try {
      const response = await getSimilarMovies(String(id));
      const results: Movie[] = response.data.results;
      setSimilarMovies(results);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  useEffect(() => {
    if (props.id) fetchData(props.id);
  }, [props.id]);

  return (
    <>
      <MoviesCarousel
        navigation={props.navigation}
        title="More like this"
        movies={similarMovies}
      />
    </>
  );
};

export default SimilarMovies;
