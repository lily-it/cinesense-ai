import React, { useEffect, useState } from "react";

interface Movie {
  id: number | string;
  title: string;
  overview?: string;
  poster?: string;
  backdrop?: string;
}

interface Props {
  movies: Movie[];
}

const RecommendationCarousel: React.FC<Props> = ({ movies }) => {
  const [index, setIndex] = useState(0);

  // Auto-change movie every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const movie = movies[index];

  return (
    <div className="carousel-container">
      <div className="carousel-movie">
        <img
          src={movie.backdrop || movie.poster}
          alt={movie.title}
          className="carousel-image"
        />
        <div className="carousel-overlay">
          <h2 className="carousel-title">{movie.title}</h2>
          <p className="carousel-desc">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCarousel;
