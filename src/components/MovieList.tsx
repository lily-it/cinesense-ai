import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../utils/api";
import type { TMDBMovie } from "../utils/api";
import type { Movie } from "../types";

export default function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchTrendingMovies();
        const list: TMDBMovie[] = Array.isArray(data.results)
          ? data.results
          : [];

        const formatted: Movie[] = list.map((m) => ({
          id: m.id,
          title: m.title,
          overview: m.overview,
          releaseDate: m.release_date ?? "",
          rating: m.vote_average,
          genres: [],
          poster: m.poster_path
            ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
            : "/no-image.jpg",
          backdrop: m.backdrop_path
            ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
            : undefined
        }));

        setMovies(formatted);
      } catch  {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { movies, loading, error };
}
