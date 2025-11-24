// src/hooks/useMovieDetails.ts
import { useEffect, useState } from "react";
import type { MovieDetails } from "../types/MovieTypes";
import { fetchMovieDetails, fetchMovieTrailer } from "../utils/api";

/* ----------------------------------------------------
   TMDB TYPES (fully typed, no any)
---------------------------------------------------- */

interface TMDBGenre {
  id: number;
  name: string;
}

interface TMDBSpokenLanguage {
  english_name: string;
}

interface TMDBTranslationData {
  overview?: string;
}

interface TMDBTranslation {
  iso_639_1: string;
  data: TMDBTranslationData;
}

interface TMDBMovieResponse {
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
  spoken_languages: TMDBSpokenLanguage[];
  genres: TMDBGenre[];
  translations?: {
    translations: TMDBTranslation[];
  };
}

/* ----------------------------------------------------
   HOOK
---------------------------------------------------- */

export const useMovieDetails = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data: TMDBMovieResponse = await fetchMovieDetails(movieId);

        /* ----------------------------------------------------
           Get English extended overview safely
        ---------------------------------------------------- */

        const englishEntry = data.translations?.translations.find(
          (t: TMDBTranslation) => t.iso_639_1 === "en"
        );

        const extendedOverview = englishEntry?.data.overview;

        const fullOverview =
          extendedOverview && extendedOverview.length > data.overview.length
            ? extendedOverview
            : data.overview;

        /* ----------------------------------------------------
           Build long description
        ---------------------------------------------------- */

        const longDescription =
          fullOverview.length > 600
            ? fullOverview
            : `${fullOverview}\n\nThis movie explores deeper character arcs, hidden motives, twists, and emotional layers throughout its story.`;

        /* ----------------------------------------------------
           Set Movie Object (fully typed)
        ---------------------------------------------------- */

        setMovie({
          id: data.id,
          title: data.title,
          overview: fullOverview,
          longDescription,
          rating: data.vote_average,
          genres: data.genres.map((g: TMDBGenre) => g.name),
          poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          backdrop: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
          releaseDate: data.release_date,
          runtime: data.runtime,
          languages: data.spoken_languages.map(
            (l: TMDBSpokenLanguage) => l.english_name
          ),
          budget: data.budget,
          revenue: data.revenue,
          status: data.status
        });

        /* ----------------------------------------------------
           Fetch Trailer
        ---------------------------------------------------- */

        const trailerKey = await fetchMovieTrailer(movieId);
        setTrailer(trailerKey);

      } catch  {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [movieId]);

  return { movie, trailer, loading, error };
};
