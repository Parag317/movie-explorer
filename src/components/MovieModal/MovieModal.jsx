import React from "react";
import "./MovieModal.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieModal({ movie, onClose }) {
  if (!movie) return null;

  const poster = movie.poster_path
    ? IMAGE_BASE + movie.poster_path
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-modal__backdrop" onClick={onClose}>
      <div
        className="movie-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="movie-modal__close" onClick={onClose}>
          ✕
        </button>

        <div className="movie-modal__content">
          <img src={poster} alt={movie.title} className="movie-modal__image" />

          <div className="movie-modal__info">
            <h2 className="movie-modal__title">{movie.title}</h2>

            {movie.tagline && (
              <p className="movie-modal__tagline">“{movie.tagline}”</p>
            )}

            <p className="movie-modal__meta">
              ⭐ {movie.vote_average?.toFixed(1) || "N/A"} ·{" "}
              {movie.release_date || "Unknown"} ·{" "}
              {(movie.original_language || "").toUpperCase()}
            </p>

            {movie.overview && (
              <p className="movie-modal__overview">{movie.overview}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
