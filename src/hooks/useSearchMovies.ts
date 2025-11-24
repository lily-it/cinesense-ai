import { useEffect, useState } from "react";
import type { TMDBMovie } from "../utils/api";
import { searchMovies } from "../utils/api";

export const useSearchMovies = (query: string) => {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const data = await searchMovies(query);
        setMovies(data.results);
      } catch {
        setError("Failed to search movies.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [query]);

  return { movies, loading, error };
};
