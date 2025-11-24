// src/utils/api.ts
import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;   // ✅ USE ENV ALWAYS
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch full movie details
export const getMovieDetails = async (movieId: number) => {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,reviews,translations`;
  const res = await axios.get(url);
  return res.data;
};

// Fetch movie trailer
export const fetchMovieTrailer = async (movieId: number) => {
  const url = `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  const trailer = data.results?.find(
    (v: { type: string }) => v.type === "Trailer"
  );

  return trailer ? trailer.key : null;
};

// Fetch recommended movies
export const fetchRecommendations = async (movieId: number) => {
  const url = `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`;
  const res = await axios.get(url);
  return res.data;
};
// add to src/utils/api.ts (below existing exports)
export interface TMDBGenreListResponse {
  genres: { id: number; name: string }[];
}

/**
 * Fetch movies by TMDB genre id (discover endpoint, returns a TMDBMovieListResponse)
 * Example: discover/movie?with_genres=28&sort_by=popularity.desc
 */
// TMDB Movie structure from TMDB API
export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  release_date?: string;
  vote_average: number;
  genre_ids?: number[];
  poster_path: string | null;
  backdrop_path: string | null;
}

// Generic list response from TMDB
export interface TMDBMovieListResponse {
  page: number;
  results: TMDBMovie[];
  total_pages?: number;
  total_results?: number;
}

