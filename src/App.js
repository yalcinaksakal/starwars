import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Spinner from "./UI/Spinner";
import AddMovie from "./components/AddMovie";

const movieUrl = "https://react-http-f069a-default-rtdb.firebaseio.com/";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async (movie = null) => {
    setLoading(true);
    setMovies([]);
    setError(null);
    const fetcParams = movie
      ? {
          method: "POST",
          body: JSON.stringify(movie),
          headers: { "Content-Type": "application/json" },
        }
      : {};
    try {
      const response = await fetch(`${movieUrl}movies.json`, fetcParams);
      if (!response.ok)
        throw new Error(
          `Couldn't ${movie ? "get response from base URL." : "send data."}`
        );
      if (movie) fetchMoviesHandler();
      else {
        const data = await response.json();
        const transformedReults = data
          ? Object.keys(data).map(key => {
              return {
                ...data[key],
                id: key,
              };
            })
          : [];
        setMovies(transformedReults);
      }
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addMovieHandler = movie => {
    fetchMoviesHandler(movie);
  };
  const getMoviesHandler = () => {
    fetchMoviesHandler();
  };
  let content = <h4>Found no movies.</h4>;

  if (movies.length > 0)
    content = (
      <section>
        <MoviesList movies={movies} />
      </section>
    );
  if (error) content = <h4>{error}</h4>;
  if (loading) content = <h4>Loading.</h4>;

  return (
    <React.Fragment>
      <header>
        {loading ? (
          <Spinner />
        ) : (
          <button onClick={getMoviesHandler}>Get Movies</button>
        )}
      </header>
      {content}
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
    </React.Fragment>
  );
}

export default App;
