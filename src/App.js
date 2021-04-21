import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Spinner from "./UI/Spinner";
import AddMovie from "./components/AddMovie";

const baseUrl = "https://swapi.dev/api/";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    setMovies([]);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}films/`);
      if (!response.ok) throw new Error("Couldn't get response from base URL.");
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
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = movie => {
    console.log(movie);
  };

  let content = <h4>Found no movies.</h4>;

  if (movies.length > 0)
    content = (
      <section>
        <MoviesList movies={movies} />
      </section>
    );
  if (error) content = <h4>{error}</h4>;
  if (loading) content = <Spinner />;

  return (
    <React.Fragment>
      <header>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </header>
      {content}
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
    </React.Fragment>
  );
}

export default App;
