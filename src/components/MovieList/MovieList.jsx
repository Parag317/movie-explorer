import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";

export default function MovieList({ movies, onMovieSelect }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onSelect={onMovieSelect}
        />
      ))}
    </div>
  );
}
