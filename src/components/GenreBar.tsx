import React from "react";

interface GenreBarProps {
  selectedGenreId: number | null;
  searchActive: boolean;
  onSelect: (id: number) => void;
  onClear: () => void;
}

const genres = [
  { id: 28, name: "Action", emoji: "🔥" },
  { id: 35, name: "Comedy", emoji: "😂" },
  { id: 27, name: "Horror", emoji: "😱" },
  { id: 10749, name: "Romance", emoji: "❤️" },
  { id: 878, name: "Sci-Fi", emoji: "🛸" },
  { id: 53, name: "Thriller", emoji: "🔪" },
];

const GenreBar: React.FC<GenreBarProps> = ({
  selectedGenreId,
  searchActive,
  onSelect,
  onClear,
}) => {
  if (searchActive) return null; // Hide during search

  return (
    <div className="genre-bar-container">
      {genres.map((g) => (
        <button
          key={g.id}
          className={`genre-btn ${selectedGenreId === g.id ? "active" : ""}`}
          onClick={() => onSelect(g.id)}
        >
          <span>{g.emoji}</span> {g.name}
        </button>
      ))}

      {/* CLEAR FILTER BUTTON */}
      {selectedGenreId !== null && (
        <button className="clear-btn" onClick={onClear}>
          ❌ Clear
        </button>
      )}
    </div>
  );
};

export default GenreBar;
