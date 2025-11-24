// src/components/MovieRow.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../types";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  return (
    <div className="movie-row-container">
      <h3 className="movie-row-title">{title}</h3>

      <div className="movie-row">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="movie-row-card"
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="movie-row-poster"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
