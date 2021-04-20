import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Spinner from "./UI/Spinner";

const baseUrl = "https://swapi.dev/api/";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setLoading(true);
    setMovies([]);
    try {
      const response = await fetch(`${baseUrl}films/`);
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
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      {movies.length > 0 ? (
        <section>
          <MoviesList movies={movies} />
        </section>
      ) : (
        loading && <Spinner />
      )}
    </React.Fragment>
  );
}

export default App;
