import React from "react";
import type { Movie } from "../types";
import MovieCard from "./MovieCard";

interface MovieGridProps {
    movies: Movie[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};

export default MovieGrid;
