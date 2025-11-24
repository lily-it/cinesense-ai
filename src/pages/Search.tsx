// src/components/SearchBar.tsx
import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="hero-searchbar-wrapper">
      <input
        className="hero-search-input"
        type="text"
        placeholder="Search movies, genres, actors..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="hero-search-icon">🔍</span>
    </div>
  );
};

export default SearchBar;
