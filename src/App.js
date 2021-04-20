import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Spinner from "./UI/Spinner";

const baseUrl = "https://swapi.dev/api/";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMoviesHandler = async () => {
    setLoading(true);
    setMovies([]);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}film/`);
      if (!response.ok) throw new Error("Couldn't get response from base URL");
      const data = await response.json();
      const transformedReults = data.results.map(movie => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          release: movie.release_date,
        };
      });
      setMovies(transformedReults);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <header>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </header>
      {movies.length > 0 ? (
        <section>
          <MoviesList movies={movies} />
        </section>
      ) : (
        loading && <Spinner />
      )}
      {!loading && error && <p>{error}</p>}
    </React.Fragment>
  );
}

export default App;
