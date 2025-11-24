import { useEffect, useState } from "react";
import { fetchRecommendations, fetchMovieTrailer } from "../utils/api";
import type { TMDBMovie } from "../utils/api";

export interface AIMovie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  rating: number;
  poster: string;
  backdrop: string;
  trailer: string | null;
}

export const useAIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<AIMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchRecommendations(550);

        // FIX: TMDB sometimes returns results = null
        const list: TMDBMovie[] = Array.isArray(data.results)
          ? data.results
          : [];

        const formatted = await Promise.all(
          list.map(async (m) => {
            const trailer = await fetchMovieTrailer(m.id);

            return {
              id: m.id,
              title: m.title,
              overview: m.overview,
              releaseDate: m.release_date ?? "Unknown",
              rating: m.vote_average,
              poster: m.poster_path
                ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                : "/no-image.jpg",
              backdrop: m.backdrop_path
                ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
                : "/no-backdrop.jpg",
              trailer,
            };
          })
        );

        setRecommendations(formatted);
      } catch {
        setError("Failed to load AI recommendations.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { recommendations, loading, error };
};
