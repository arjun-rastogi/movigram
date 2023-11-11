import React, { useEffect, useState } from "react";
import { getUpcoming } from "../services/movieService";
import { Movie } from "../types/MovieType";
import MoviesCarousel from "./../common/MoviesCarousel";

const UpcomingMovie = (props: any) => {
  const [upcomingMovie, setUpcomingMovie] = useState<Movie[]>([]);
  const fetchData = async () => {
    try {
      const response = await getUpcoming();
      const results: Movie[] = response.data.results;
      setUpcomingMovie(results);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MoviesCarousel
        navigation={props.navigation}
        title="Upcoming Movie"
        movies={upcomingMovie}
      />
    </>
  );
};

export default UpcomingMovie;
