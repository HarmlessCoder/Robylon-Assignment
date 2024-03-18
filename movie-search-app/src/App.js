import './App.css';
import { useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';

// ad2035bd
 
function App() {

  const IMAGE_PATH = "https://image.tmdb.org/t/p/w780"
  const API_URL = "https://api.themoviedb.org/3/"
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [selectedMovie, setSelecetedMovie] = useState({})

  const fetchMovies = async (searchKey) => {
    try {
      const type = searchKey ? "search" : "discover"
      const {data: {results}}  = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: process.env.REACT_APP_MOVIE_API_KEY,
          query: searchKey
        }
      });
      // console.log('data', data);

      setSelecetedMovie(results[0])
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

  const searchMovies = (e) => {
    e.preventDefault()
    fetchMovies(searchKey)
  }

  return (
    <div className="App">
     
      <header className={"header"}>
        <div className='header-content'>

        <h1>Movie App</h1>

        <form onSubmit={searchMovies}>
          <input type="text" onChange={(e)=> setSearchKey(e.target.value)}/>
          <button type="submit">Search</button>
        </form>
        </div>
      </header>

      <div className="hero" style={{backgroundImage: `url("${IMAGE_PATH}${selectedMovie.backdrop_path}")`}}>
        <div className="hero-content max-center" >
          {console.log(selectedMovie)}
          <button className={"button"}>Play Trailer</button>
          <h1 className={"hero-title"}>{selectedMovie.title}</h1>
          { selectedMovie.overview ? <p className={"hero-overview"}>{selectedMovie.overview}</p> : null}

        </div>
      </div>

      <div className="container">
        {renderMovies()}
      </div>
    </div>
  );
}

export default App;
