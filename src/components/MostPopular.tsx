import React, { useEffect, useState } from "react";
import { getMostPopular } from "../services/movieService";
import { Movie } from "../types/MovieType";
import MoviesCarousel from "./../common/MoviesCarousel";

const MostPopular = () => {
  const [mostPopular, setMostPopular] = useState<Movie[]>([]);
  const fetchData = async () => {
    try {
      const response = await getMostPopular();
      const results: Movie[] = response.data.results;
      setMostPopular(results);
    } catch (error) {
      console.error("Error fetching movie list:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <MoviesCarousel title="Most Popular" movies={mostPopular} />
    </>
  );
};

export default MostPopular;
