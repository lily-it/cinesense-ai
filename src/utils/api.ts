// src/utils/api.ts
import axios from "axios";

/* ----------------------------------------------------
   Environment
---------------------------------------------------- */
const API_KEY: string = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  console.error("❌ TMDB API key missing! Set VITE_TMDB_API_KEY in .env");
}

/* ----------------------------------------------------
   TMDB Basic Types
---------------------------------------------------- */
export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBSpokenLanguage {
  english_name: string;
}

export interface TMDBTranslationData {
  overview?: string;
}

export interface TMDBTranslation {
  iso_639_1: string;
  data: TMDBTranslationData;
}

export interface TMDBVideo {
  key: string;
  type: string;
}

export interface TMDBMovieDetailsResponse {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  budget: number;
  revenue: number;
  status: string;

  genres: TMDBGenre[];
  spoken_languages: TMDBSpokenLanguage[];

  translations?: {
    translations: TMDBTranslation[];
  };

  videos?: {
    results: TMDBVideo[];
  };
}

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  genre_ids?: number[];
}

export interface TMDBMovieListResponse {
  page: number;
  results: TMDBMovie[];
}

/* ----------------------------------------------------
   Universal GET Helper
---------------------------------------------------- */
export const apiGet = async <T>(endpoint: string): Promise<T> => {
  const url =
    endpoint.includes("?")
      ? `${BASE_URL}/${endpoint}&api_key=${API_KEY}`
      : `${BASE_URL}/${endpoint}?api_key=${API_KEY}`;

  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    console.error(`❌ API GET Error at ${endpoint}`, error);
    throw error;
  }
};


/* ----------------------------------------------------
   API FUNCTIONS
---------------------------------------------------- */

// 1. Movie Details (NO ANY)
export const fetchMovieDetails = (movieId: number) =>
  apiGet<TMDBMovieDetailsResponse>(
    `movie/${movieId}&append_to_response=videos,translations`
  );

// 2. Trending Movies
export const fetchTrendingMovies = () =>
  apiGet<TMDBMovieListResponse>("trending/movie/week");

// 3. Recommendations
export const fetchRecommendations = (movieId: number) =>
  apiGet<TMDBMovieListResponse>(`movie/${movieId}/recommendations`);

// 4. Trailer
export const fetchMovieTrailer = async (
  movieId: number
): Promise<string | null> => {
  const data = await apiGet<{ results: TMDBVideo[] }>(
    `movie/${movieId}/videos`
  );

  const trailer = data.results.find((v) => v.type === "Trailer");
  return trailer ? trailer.key : null;
};

// 5. Search Movies
// 5. Search Movies
export const searchMovies = (query: string) =>
  apiGet<TMDBMovieListResponse>(
    `search/movie?query=${encodeURIComponent(query)}`
  );

// add to src/utils/api.ts (below existing exports)
export interface TMDBGenreListResponse {
  genres: { id: number; name: string }[];
}

/**
 * Fetch movies by TMDB genre id (discover endpoint, returns a TMDBMovieListResponse)
 * Example: discover/movie?with_genres=28&sort_by=popularity.desc
 */
export const fetchMoviesByGenre = (genreId: number, page = 1) =>
  apiGet<TMDBMovieListResponse>(
    `discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`
  );

/**
 * Optional: fetch list of genres (useful for Genre Browsing)
 */
export const fetchGenreList = () =>
  apiGet<TMDBGenreListResponse>("genre/movie/list");
export const fetchTopRatedMovies = () =>
  apiGet<TMDBMovieListResponse>("movie/top_rated");
