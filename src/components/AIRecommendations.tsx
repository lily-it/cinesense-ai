import React from "react";
import { Link } from "react-router-dom";
import { useAIRecommendations } from "../hooks/useAIRecommendations";

import "./ai-recommendations.css";

const AIRecommendations: React.FC = () => {
  const { recommendations, loading, error } = useAIRecommendations();

  if (loading) return <p>Loading latest movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {recommendations.map((movie) => (
          <Link 
            key={movie.id}
            to={`/movie/${movie.id}`} 
            className="carousel-card"
          >
            <img
              className="carousel-poster"
              src={
                movie.poster
                  ? movie.poster
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
            />

            <div className="carousel-info">
              <h3>{movie.title}</h3>
              <span>Rating: ⭐ {movie.rating}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
