import http from "./httpService";

const nowPlayingEndpoint = "/movie/now_playing";
const API_KEY = "1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const language = "en-US"; // Replace with the desired language

const apiEndPoint = `${BASE_URL}${nowPlayingEndpoint}?api_key=${API_KEY}&language=${language}`;
export const baseImagePath = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
// Get the NowPlaying Data
export async function getNowPlayinges(): Promise<any> {
  try {
    return await http.get(apiEndPoint); // Corrected apiUrl variable
  } catch (error) {
    // Handle error
    console.error("Error retrieving NowPlayinges data:", error);
    // throw error;
  }
}
