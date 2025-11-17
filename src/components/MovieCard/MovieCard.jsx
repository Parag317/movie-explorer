import React from "react";
import "./MovieCard.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w342";

export default function MovieCard({ movie, onSelect }) {
  const poster = movie.poster_path
    ? IMAGE_BASE + movie.poster_path
    : "https://via.placeholder.com/342x513?text=No+Image";

  return (
    <div className="movie-card" onClick={() => onSelect(movie)}>
      <img src={poster} alt={movie.title} className="movie-card__image" />
      <div className="movie-card__body">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__meta">
          ⭐ {movie.vote_average?.toFixed(1) || "N/A"} ·{" "}
          {movie.release_date || "Unknown"}
        </p>
      </div>
    </div>
  );
}
