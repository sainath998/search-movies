import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=b177d325";

const movie1 = {
  Title: "Batman Begins",
  Year: "2005",
  imdbID: "tt0372784",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
};

function App() {
  // b177d325
  const serachMovies = async (title) => {
    if (title == "") title = "Spider";
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // console.log(data.Search);
    setMovies(data.Search);
  };

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect(() => {
    serachMovies("Batman");
  }, []);

  // useEffect(() => {
  //   serachMovies(movies);
  // }, [movies]);
  useEffect(() => {
    serachMovies(searchTerm);
  }, [searchTerm]);

  return (
    <div className="app">
      <h1>Movie World</h1>

      <div className="search">
        <input
          placeholder="search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={logo} />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {/* <MovieCard movie1={movie1} /> */}
          {movies?.map((movie) => (
            <MovieCard key={movie.imdbID} movie1={movie} />
          ))}
        </div>
      ) : (
        <div>
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
