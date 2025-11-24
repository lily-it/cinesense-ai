// src/hooks/useCategoryRows.ts
import { useEffect, useState } from "react";
import { fetchTrendingMovies, apiGet, fetchMoviesByGenre } from "../utils/api";
import type { TMDBMovie } from "../utils/api";
import type { Movie } from "../types";

export interface CategoryRow {
  id: string;           // slug id e.g. "trending"
  title: string;        // display title
  movies: Movie[];      // formatted for UI
}

const formatTMDBList = (list: TMDBMovie[]): Movie[] =>
  list.map((m) => ({
    id: m.id,
    title: m.title,
    overview: m.overview,
    releaseDate: m.release_date ?? "Unknown",
    rating: m.vote_average,
    genres: [],
    poster: m.poster_path ? `https://image.tmdb.org/t/p/w300${m.poster_path}` : "/mnt/data/9fb33173-93d2-4e56-84a7-f69a0c35ae3c.png",
    backdrop: m.backdrop_path ? `https://image.tmdb.org/t/p/original${m.backdrop_path}` : undefined,
  }));

export const useCategoryRows = () => {
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        // 1) Trending
        const trendingRes = await fetchTrendingMovies(); // TMDBMovieListResponse
        const trending = formatTMDBList(trendingRes.results.slice(0, 20));

        // 2) Top Rated (TMDB top_rated)
        const topRatedRes = await apiGet<{ results: TMDBMovie[] }>("movie/top_rated");
        const topRated = formatTMDBList((topRatedRes.results || []).slice(0, 20));

        // 3) Genres by id (Action=28, Comedy=35, Horror=27, Romance=10749, Sci-Fi=878)
        const action = formatTMDBList((await fetchMoviesByGenre(28)).results.slice(0, 20));
        const comedy = formatTMDBList((await fetchMoviesByGenre(35)).results.slice(0, 20));
        const horror = formatTMDBList((await fetchMoviesByGenre(27)).results.slice(0, 20));
        const romance = formatTMDBList((await fetchMoviesByGenre(10749)).results.slice(0, 20));
        const scifi = formatTMDBList((await fetchMoviesByGenre(878)).results.slice(0, 20));

        const built: CategoryRow[] = [
          { id: "trending", title: "Trending Now", movies: trending },
          { id: "toprated", title: "Top Rated", movies: topRated },
          { id: "action", title: "Action Movies", movies: action },
          { id: "comedy", title: "Comedy Movies", movies: comedy },
          { id: "horror", title: "Horror Movies", movies: horror },
          { id: "romance", title: "Romance Movies", movies: romance },
          { id: "scifi", title: "Sci-Fi", movies: scifi },
        ];

        setRows(built);
      } catch (err) {
        console.error(err);
        setError("Failed to load category rows.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { rows, loading, error };
};
