import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useMovieDetails } from "../hooks/useMovieDetails";
import { useMovieRecommendations } from "../hooks/useMovieRecommendations";

import MovieGrid from "../components/MovieGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import CommunityReviews from "../components/CommunityReviews";

import "./MovieDetails.css";

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const movieId = Number(id);

  const { movie, trailer, loading, error } = useMovieDetails(movieId);
  const { movies: recommended } = useMovieRecommendations(movieId);

  const [showTrailer, setShowTrailer] = useState(false);
  const [expandStory, setExpandStory] = useState(false);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movie) return <ErrorMessage message="Movie not found." />;

  return (
    <div className="movie-details-page">
      {/* BACKDROP */}
      <div
        className="backdrop-header"
        style={{ backgroundImage: `url(${movie.backdrop})` }}
      >
        <div className="backdrop-overlay"></div>

        <div className="movie-header-content">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-rating">⭐ {movie.rating.toFixed(1)}</p>
          <p className="movie-genres">{movie.genres.join(", ")}</p>
        </div>
      </div>

      <div className="content-wrapper">
        {/* STORY */}
        <h2 className="section-title">Story</h2>

        <p className="movie-overview-text">
          {expandStory ? movie.longDescription : movie.overview}
        </p>

        <button
          className="show-more-btn"
          onClick={() => setExpandStory(!expandStory)}
        >
          {expandStory ? "Show Less" : "Read Full Story"}
        </button>

        {/* EXTRA DETAILS */}
        <div className="movie-extra-details">
          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p><strong>Runtime:</strong> {movie.runtime} min</p>
          <p><strong>Status:</strong> {movie.status}</p>
          <p><strong>Languages:</strong> {movie.languages.join(", ")}</p>
          {movie.budget > 0 && (
            <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
          )}
          {movie.revenue > 0 && (
            <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
          )}
        </div>

        {/* TRAILER */}
        <h2 className="section-title">Trailer</h2>

        {trailer ? (
          <>
            <div
              className="trailer-container"
              onClick={() => setShowTrailer(true)}
            >
              <iframe
                className="trailer-frame"
                src={`https://www.youtube.com/embed/${trailer}`}
                allowFullScreen
              />
            </div>

            {showTrailer && (
              <div
                className="trailer-modal"
                onClick={() => setShowTrailer(false)}
              >
                <div className="trailer-modal-content zoom-in">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <p>No trailer available.</p>
        )}

        {/* RECOMMENDED MOVIES */}
        <h2 className="section-title">Recommended Movies</h2>
        <MovieGrid movies={recommended} />

        {/* REVIEWS */}
        <h2 className="section-title">Community Reviews</h2>
        <CommunityReviews movieId={movieId} />
      </div>
    </div>
  );
};

export default MovieDetails;
