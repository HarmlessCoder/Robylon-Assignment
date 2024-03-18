import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import Trailer from './components/Trailer'; // Import the Trailer component
import Youtube from "react-youtube";

function App() {
  // Define constants
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w780"
  const API_URL = "https://api.themoviedb.org/3/"

  // State variables
  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({});
  const [playTrailer, setPlayTrailer] = useState(false);
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Fetch movies from the API
  const fetchMovies = async (searchKey) => {
    try {
      const type = searchKey ? "search" : "discover";
      const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          query: searchKey
        }
      });

      setMovies(results);
      await selectMovie(results[0]); // Select the first movie by default

    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  // Fetch detailed movie information
  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        append_to_response: 'videos'
      }
    });

    return data;
  }

  // Select a movie and fetch its details
  const selectMovie = async (movie) => {
    setPlayTrailer(false);
    const data = await fetchMovie(movie.id);
    console.log('movie data', data);
    setSelectedMovie(data);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Fetch movies on initial load
  useEffect(() => {
    fetchMovies();
  }, []);

  // Event listeners for Ctrl key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'k' && event.ctrlKey) {
        event.preventDefault();
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'Control') {
        setIsCtrlPressed(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Focus search input when Ctrl key is pressed
  useEffect(() => {
    if (isCtrlPressed) {
      document.getElementById('searchInput').focus();
    }
  }, [isCtrlPressed]);

  // Render movie cards
  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie}
        selectMovie={selectMovie}
      />
    ))
  )

  // Search for movies
  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey);
  }

  return (
    <div className="App">
      {/* Header */}
      <header className={"center-max-size header"}>
        <span className={"brand"}>Robylon.ai Movie App</span>

        {/* Search form */}
        <form className="form" onSubmit={searchMovies}>
          <input className="search" type="text" id="searchInput" placeholder="Search for movies..." onChange={(e) => setSearchKey(e.target.value)} />
          <button className="submit-search" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-search"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
      </header>

      {/* Movie poster */}
      <div className="poster" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url("${IMAGE_PATH}${selectedMovie.backdrop_path}")` }}>
  {console.log(selectedMovie)}

  {/* Render trailer if selectedMovie has videos */}
  {selectedMovie.videos && playTrailer ? <Trailer selectedMovie={selectedMovie} /> : null}
  {playTrailer ? <button className={"button close-video"} onClick={() => setPlayTrailer(false)}>Close Trailer</button> : null}
  {!playTrailer &&
    <div className="center-max-size">
      <div className="poster-content">
        <button className={"button play-video"} type="button" onClick={() => setPlayTrailer(true)}>Play Trailer</button>
        <h1>{selectedMovie.title}</h1>
        <p>{selectedMovie.overview}</p>
      </div>
    </div>
  }
</div>


      {/* Movie card container */}
      <div className={"center-max-size container"}>
        {renderMovies()}
      </div>
    </div>
  );
}

export default App;
