import React, { useRef, useState, useEffect } from "react";

import AIRecommendations from "../components/AIRecommendations";
import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import SearchBar from "../components/SearchBar";
import GenreBar from "../components/GenreBar";
import Footer from "../components/Footer";

import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { useTestConnection } from "../hooks/useTestConnection";

import { searchMovies, fetchMoviesByGenre } from "../utils/api";
import type { TMDBMovie } from "../utils/api";
import type { Movie } from "../types";

import { supabase } from "../supabaseClient";
import type { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

import "../index.css";

/* Convert TMDB → Movie format (for search & genre) */
const mapTmdbToMovie = (m: TMDBMovie): Movie => ({
  id: m.id,
  title: m.title,
  overview: m.overview,
  releaseDate: m.release_date ?? "Unknown",
  rating: m.vote_average,
  genres: [],
  poster: m.poster_path
    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
    : "/no-image.jpg",
  backdrop: m.backdrop_path
    ? `https://image.tmdb.org/t/p/original${m.backdrop_path}`
    : undefined
});

const Home: React.FC = () => {
  useTestConnection();

  const { movies, loading, error } = useTrendingMovies();
  const trendingRef = useRef<HTMLDivElement | null>(null);

  /* USER AUTH STATE */
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");

  /* SEARCH STATES */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  /* GENRE STATES */
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [genreResults, setGenreResults] = useState<Movie[]>([]);
  const [genreLoading, setGenreLoading] = useState(false);
  const [genreError, setGenreError] = useState("");

  /* PERSONALIZED GENRE STATES (Option A) */
  const [personalGenres, setPersonalGenres] = useState<string[]>([]);
  const [personalGenreMovies, setPersonalGenreMovies] = useState<Movie[]>([]);
  const [personalLoading, setPersonalLoading] = useState(false);
  const [personalError, setPersonalError] = useState("");

  useEffect(() => {
    // Load current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setUsername(session.user.user_metadata?.name || "");
      }
    });

    // Listen for login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          setUsername(session.user.user_metadata?.name || "");
        } else {
          setUser(null);
          setUsername("");
          setPersonalGenres([]);
          setPersonalGenreMovies([]);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const scrollToTrending = () => {
    trendingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* HERO BACKGROUND */
  const backgroundImage = movies.length
    ? `https://image.tmdb.org/t/p/original${movies[0].backdrop}`
    : "https://image.tmdb.org/t/p/original/8uVKfOJUhmybNsVh089EqPmQJmc.jpg";

  /* SEARCH API EFFECT + log genre interest */
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) {
      setSearchResults([]);
      setSearchError("");
      return;
    }

    let active = true;

    const run = async () => {
      try {
        setSearchLoading(true);
        setSearchError("");
        const data = await searchMovies(q);
        const list: TMDBMovie[] = Array.isArray(data.results)
          ? data.results
          : [];

        if (active) {
          setSearchResults(list.map(mapTmdbToMovie));
        }

        // Personalization: record genre interest from first result
        if (user && list.length > 0) {
          const first = list[0] as TMDBMovie & { genre_ids?: number[] };
          const genreIds = first.genre_ids ?? [];

          // call RPC for each genre id (you must create increment_genre_interest in Supabase)
          await Promise.all(
            genreIds.map((gid) =>
              supabase.rpc("increment_genre_interest", {
                p_user_id: user.id,
                p_genre: String(gid)
              })
            )
          );
        }
      } catch {
        if (active) setSearchError("Failed to search movies.");
      } finally {
        if (active) setSearchLoading(false);
      }
    };

    void run();
    return () => {
      active = false;
    };
  }, [searchQuery, user]);

  /* GENRE EFFECT (normal GenreBar selection) */
  useEffect(() => {
    if (selectedGenreId === null) {
      setGenreResults([]);
      setGenreError("");
      return;
    }

    let active = true;

    const run = async () => {
      try {
        setGenreLoading(true);
        setGenreError("");
        const data = await fetchMoviesByGenre(selectedGenreId);
        const list: TMDBMovie[] = Array.isArray(data.results)
          ? data.results
          : [];

        if (active) setGenreResults(list.map(mapTmdbToMovie));
      } catch {
        if (active) setGenreError("Failed to load genre movies.");
      } finally {
        if (active) setGenreLoading(false);
      }
    };

    void run();
    return () => {
      active = false;
    };
  }, [selectedGenreId]);

  /* LOAD TOP PERSONAL GENRES FOR USER */
  useEffect(() => {
    const loadGenres = async () => {
      if (!user) {
        setPersonalGenres([]);
        return;
      }

      try {
        setPersonalError("");
        const { data, error: genreErr } = await supabase
          .from("user_genre_interest")
          .select("genre")
          .eq("user_id", user.id)
          .order("score", { ascending: false })
          .limit(3);

        if (genreErr) {
          console.error("Error fetching user_genre_interest:", genreErr.message);
          setPersonalError("Failed to load your preferred genres.");
          setPersonalGenres([]);
          return;
        }

        const genres = (data ?? []).map((row: { genre: string }) => row.genre);
        setPersonalGenres(genres);
      } catch (e) {
        console.error("Unexpected error loading personal genres:", e);
        setPersonalError("Failed to load your preferred genres.");
        setPersonalGenres([]);
      }
    };

    void loadGenres();
  }, [user]);

  /* LOAD MOVIES FOR PERSONAL GENRES */
  useEffect(() => {
    const loadMovies = async () => {
      if (personalGenres.length === 0) {
        setPersonalGenreMovies([]);
        return;
      }

      try {
        setPersonalLoading(true);
        setPersonalError("");

        const all: Movie[] = [];

        // Fetch a few movies for each favorite genre
        for (const g of personalGenres) {
          const genreId = Number(g);
          if (Number.isNaN(genreId)) continue;

          const data = await fetchMoviesByGenre(genreId);
          const list: TMDBMovie[] = Array.isArray(data.results)
            ? data.results
            : [];

          all.push(...list.slice(0, 6).map(mapTmdbToMovie));
        }

        setPersonalGenreMovies(all);
      } catch (e) {
        console.error("Error loading personalized genre movies:", e);
        setPersonalError("Failed to load personalized picks.");
        setPersonalGenreMovies([]);
      } finally {
        setPersonalLoading(false);
      }
    };

    void loadMovies();
  }, [personalGenres]);

  /* HANDLERS */
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setSelectedGenreId(null);
    setGenreResults([]);
  };

  const handleGenreSelect = (id: number) => {
    setSelectedGenreId(id);
    setSearchQuery("");
    setSearchResults([]);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSelectedGenreId(null);
    setGenreResults([]);
  };

  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* AUTH BAR (Left Side) */}
        <div className="auth-leftbar">
          {user ? (
            <div className="auth-user-box">
              <span className="auth-greeting">
                Welcome back, {username || "cinephile"} 👋
              </span>
              <button
                className="auth-logout-btn"
                onClick={() => supabase.auth.signOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth" className="auth-login-btn">
              Login
            </Link>
          )}
        </div>

        {/* SEARCH BAR */}
        <SearchBar value={searchQuery} onChange={handleSearchChange} />

        {/* HERO CENTER TEXT */}
        <div className="hero-text glass-panel">
          <p className="hero-tagline">Your AI-Powered Movie Guide</p>

          <h1 className="hero-title">
            Welcome to <span className="highlight-name">CineSense</span>
          </h1>

          <p className="hero-subtitle">
            Discover trending movies, uncover hidden gems, and let AI recommend
            films you’ll love.
          </p>

          <button className="hero-button" onClick={scrollToTrending}>
            Explore Movies
          </button>
        </div>
      </section>

      <div className="section-separator"></div>

      {/* SEARCH RESULTS */}
      {hasSearchQuery && (
        <section className="section-block">
          <h2 className="section-title">
            Showing Results for:{" "}
            <span className="highlight-text">{searchQuery}</span>
          </h2>

          {searchLoading && <LoadingSpinner />}
          {searchError && <ErrorMessage message={searchError} />}
          {!searchLoading && !searchError && (
            <MovieGrid movies={searchResults} />
          )}
        </section>
      )}

      {/* AI RECOMMENDATIONS */}
      <section className="section-block">
        <h2 className="section-title">
          🔥 AI Movie Recommendations
          {user && (
            <span className="section-subtitle-inline">
              {" "}
              — tuned to your taste, {username || "friend"} 🎯
            </span>
          )}
        </h2>
        <AIRecommendations />
      </section>

      {/* PERSONALIZED: GENRE-BASED PICKS */}
      {user && (
        <section className="section-block">
          <h2 className="section-title">🎯 Picks Based on Your Interests</h2>

          {personalLoading && <LoadingSpinner />}
          {personalError && <ErrorMessage message={personalError} />}

          {!personalLoading &&
            !personalError &&
            personalGenreMovies.length === 0 && (
              <p className="section-empty-text">
                Start searching for movies and we&apos;ll personalize this
                section for you.
              </p>
            )}

          {!personalLoading &&
            !personalError &&
            personalGenreMovies.length > 0 && (
              <MovieGrid movies={personalGenreMovies} />
            )}
        </section>
      )}

      {/* TRENDING MOVIES */}
      <section ref={trendingRef} className="section-block">
        <h2 className="section-title">📈 Trending Movies</h2>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && <MovieGrid movies={movies} />}
      </section>

      {/* GENRE BAR */}
      <GenreBar
        selectedGenreId={selectedGenreId}
        searchActive={hasSearchQuery}
        onSelect={handleGenreSelect}
        onClear={clearFilters}
      />

      {/* GENRE RESULTS */}
      {!hasSearchQuery && selectedGenreId !== null && (
        <section className="section-block">
          <h2 className="section-title">Genre Picks for You</h2>

          {genreLoading && <LoadingSpinner />}
          {genreError && <ErrorMessage message={genreError} />}
          {!genreLoading && !genreError && (
            <MovieGrid movies={genreResults} />
          )}
        </section>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
