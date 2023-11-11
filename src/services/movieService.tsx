import http from "./httpService";

const API_KEY = "1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const language = "en-US"; // Replace with the desired language

const nowPlayingEndpoint = "/movie/now_playing";
const mostPopularEndpoint = "/movie/popular";
const upcomingEndpoint = "/movie/upcoming";
const searchEndpoint = "/search/movie";
const movieDetailsEndpoint = "/movie"; // Correct movie details endpoint
const castDetailsEndpoint = "/movie"; // Correct cast details endpoint
const similarMoviesEndpoint = "/movie/"; // Similar movies endpoint

const buildEndpoint = (endpoint: string, query: string = "") =>
  `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=${language}${query}`;

export const baseImagePath = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Get Now Playing Data
export async function getNowPlaying(): Promise<any> {
  const endpoint = buildEndpoint(nowPlayingEndpoint);
  try {
    return await http.get(endpoint);
  } catch (error) {
    console.error("Error retrieving now playing movies data:", error);
    throw error;
  }
}

export async function getMostPopular(): Promise<any> {
  const endpoint = buildEndpoint(mostPopularEndpoint);
  try {
    return await http.get(endpoint);
  } catch (error) {
    console.error("Error retrieving most popular movies data:", error);
    throw error;
  }
}

export async function getUpcoming(): Promise<any> {
  const endpoint = buildEndpoint(upcomingEndpoint);
  try {
    return await http.get(endpoint);
  } catch (error) {
    console.error("Error retrieving upcoming movies data:", error);
    throw error;
  }
}

export async function getSearch(keyword: string): Promise<any> {
  const endpoint = buildEndpoint(searchEndpoint, `&query=${keyword}`);
  try {
    return await http.get(endpoint);
  } catch (error) {
    console.error("Error retrieving search movies data:", error);
    throw error;
  }
}

export async function getMovieDetails(movieId: string): Promise<any> {
  const endpoint = buildEndpoint(`${movieDetailsEndpoint}/${movieId}`);
  try {
    return await http.get(endpoint);
  } catch (error) {
    console.error("Error retrieving movie details:", error);
    throw error;
  }
}

export async function getCastDetails(movieId: string): Promise<any> {
  const endpoint = buildEndpoint(`${castDetailsEndpoint}/${movieId}/credits`);
  try {
    return await http.get(endpoint);
  } catch (error) {
    console.error("Error retrieving cast details:", error);
    throw error;
  }
}

export const getSimilarMovies = async (movieId: string): Promise<any> => {
  const endpoint = buildEndpoint(`${similarMoviesEndpoint}/${movieId}/similar`);
  try {
    return await http.get(endpoint);
  } catch (error) {
    console.error("Error retrieving similar movies:", error);
    throw error;
  }
};
