import axios from "axios";
import type { Movie } from "../types/movie";
import toast from "react-hot-toast";

const API_URL = `https://api.themoviedb.org/3/search/movie`;
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MovieResponse {
  results: Movie[];
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  if (!TOKEN) {
    toast.error("No movies found for your request.");
  }
  const response = await axios.get<MovieResponse>(API_URL, {
    params: {
      query,
      include_adult: false,
      language: "en - US",
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data.results;
}
