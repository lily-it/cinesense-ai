// src/hooks/useTrendingMovies.ts
import { useEffect, useState } from "react";
import type { TMDBMovie } from "../utils/api";
import { fetchTrendingMovies } from "../utils/api";
import type { Movie } from "../types";

export const useTrendingMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTrendingMovies();

        // TMDB Raw List
        const list: TMDBMovie[] = data.results;

        // Convert TMDBMovie → Movie
        const formatted: Movie[] = list.map((m) => ({
          id: m.id,
          title: m.title,
          overview: m.overview,
          releaseDate: m.release_date ?? "Unknown",
          rating: m.vote_average,
          genres: [], // TMDB trending doesn't provide full genres
          poster: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : "/no-image.jpg",
          backdrop: m.backdrop_path
            ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
            : "/no-backdrop.jpg",
        }));

        setMovies(formatted);
      } catch {
        setError("Failed to load trending movies.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { movies, loading, error };
};
