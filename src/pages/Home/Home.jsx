import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MovieList from "../../components/MovieList/MovieList";
import MovieModal from "../../components/MovieModal/MovieModal";
import "./Home.css";

const API_BASE = "https://api.themoviedb.org/3";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  console.log("API key loaded?", apiKey ? "YES" : "NO");

  async function fetchTrending() {
    if (!apiKey) {
      setError("API key is missing. Check your .env file.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `${API_BASE}/trending/movie/week?api_key=${apiKey}`
      );
      const data = await res.json();
      console.log("Trending response:", data);

      if (data.success === false) {
        setError(data.status_message || "Failed to load trending movies.");
        setMovies([]);
        return;
      }

      setMovies(data.results || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load trending movies.");
    } finally {
      setLoading(false);
    }
  }

  async function searchMovies(searchText) {
    setQuery(searchText);

    if (!apiKey) {
      setError("API key is missing. Check your .env file.");
      return;
    }

    if (!searchText.trim()) {
      fetchTrending();
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        `${API_BASE}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          searchText
        )}`
      );
      const data = await res.json();
      console.log("Search response:", data);

      if (data.success === false) {
        setError(data.status_message || "Failed to search movies.");
        setMovies([]);
        return;
      }

      setMovies(data.results || []);

      if (!data.results || data.results.length === 0) {
        setError("No movies found for that search.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  }

  function handleMovieSelect(movie) {
    setSelectedMovie(movie);
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <div className="app">
      <h1 className="app__title">🎬 Movie Explorer</h1>
      <p className="app__subtitle">
        Search for movies and discover trending titles using the TMDB API.
      </p>

      <SearchBar onSearch={searchMovies} />

      {loading && <p>Loading...</p>}

      {!loading && error && <p className="app__error">{error}</p>}

      {!loading && !error && movies.length > 0 && (
        <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="app__empty">
          Try searching for a movie like <b>Avengers</b> or <b>Batman</b>.
        </p>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <footer className="app__footer">
        <p>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </footer>
    </div>
  );
}
