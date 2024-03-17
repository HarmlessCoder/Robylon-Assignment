import './App.css';
import { useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';

// ad2035bd
 
function App() {

  const API_URL = "https://api.themoviedb.org/3/"
  const [movies, setMovies] = useState([])

  const fetchMovies = async () => {
    try {
      const {data: {results}}  = await axios.get(`${API_URL}/discover/movie`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY
        }
      });
      // console.log('data', data);
      setMovies(results)
    } catch (error) {
      console.error('Error fetching movies:', error);
    }

    
  }

  useEffect(() => {
    fetchMovies()

  },[])
  
  const renderMovies = () => (
    movies.map(movie=>(
      <MovieCard
        key={movie.id}
        movie={movie}
      />
    ))
  )

  return (
    <div className="App">
     
      <h1>Hello</h1>
      <div className="container">
        {renderMovies()}
      </div>
    </div>
  );
}

export default App;
