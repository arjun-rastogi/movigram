import http from "./httpService";

const nowPlayingEndpoint = "/movie/now_playing";
const mostPopularEndpoint = "/movie/popular";
const upcomingEndpoint = "/movie/upcoming";
const API_KEY = "1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const language = "en-US"; // Replace with the desired language

const nowPlayingEndPoint = `${BASE_URL}${nowPlayingEndpoint}?api_key=${API_KEY}&language=${language}`;
const mostPopularEndPoint = `${BASE_URL}${mostPopularEndpoint}?api_key=${API_KEY}&language=${language}`;
const upcomingEndPoint = `${BASE_URL}${upcomingEndpoint}?api_key=${API_KEY}&language=${language}`;
export const baseImagePath = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
// Get the NowPlaying Data
export async function getNowPlayinges(): Promise<any> {
  try {
    return await http.get(nowPlayingEndPoint);
  } catch (error) {
    // Handle error
    console.error("Error retrieving now playing movies data:", error);
    // throw error;
  }
}
export async function getMostPopular(): Promise<any> {
  try {
    return await http.get(mostPopularEndPoint);
  } catch (error) {
    // Handle error
    console.error("Error retrieving most popular movies data:", error);
    // throw error;
  }
}
export async function getUpcoming(): Promise<any> {
  try {
    return await http.get(upcomingEndPoint);
  } catch (error) {
    // Handle error
    console.error("Error retrieving upcoming movies data:", error);
    // throw error;
  }
}
