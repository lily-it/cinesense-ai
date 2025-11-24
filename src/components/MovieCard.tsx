// src/components/MovieCard.tsx
import React from "react";
import type { Movie } from "../types";
import { Link } from "react-router-dom";

const MovieCard: React.FC<{ movie: Movie }> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <img
        src={movie.poster}
        alt={movie.title}
        className="movie-card-poster"
        loading="lazy"
      />
      <div className="movie-card-info">
        <div className="movie-card-title">{movie.title}</div>
        <div className="movie-card-rating">⭐ {movie.rating}</div>
      </div>
    </Link>
  );
};

export default MovieCard;
