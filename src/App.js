import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?apikey=4bcac112';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const SearchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    SearchMovies("Batman");
  }, []);

  return (
    <div className="app">
      <h1>Movie Land</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => SearchMovies(searchTerm)}>Search</button>
      </div>

      <div className="container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <h2>No movies found</h2>
        )}
      </div>
    </div>
  );
};

export default App;
