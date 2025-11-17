import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(value);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search-bar__input"
      />
      <button type="submit" className="search-bar__button">
        Search
      </button>
    </form>
  );
}
