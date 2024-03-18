import './App.css';
import { useEffect, useState} from 'react';
import axios from 'axios';
import MovieCard from './components/MovieCard';
import Youtube from "react-youtube"

// ad2035bd
 
function App() {

  const IMAGE_PATH = "https://image.tmdb.org/t/p/w780"
  const API_URL = "https://api.themoviedb.org/3/"

  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState("")
  const [selectedMovie, setSelectedMovie] = useState({})
  const [playTrailer, setPlayTrailer] = useState(false)
  const [isCtrlPressed, setIsCtrlPressed] = useState(false);
  const [playing, setPlaying] = useState(false)


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

      setMovies(results)
      await selectMovie(results[0])

    } catch (error) {
      console.error('Error fetching movies:', error);
    }

    
  }

  const fetchMovie = async (id) => {
    const {data} = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: process.env.REACT_APP_MOVIE_API_KEY,
        append_to_response: 'videos'
      }
    })

    return data
  }

  const selectMovie = async (movie) => {
    setPlayTrailer(false)
    const data = await fetchMovie(movie.id)
    console.log('movie data',data);
    setSelectedMovie(data)

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  useEffect(() => {
    fetchMovies()

  },[])

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

  useEffect(() => {
    if (isCtrlPressed) {
      document.getElementById('searchInput').focus();
    }
  }, [isCtrlPressed]);
  
  
  
  const renderMovies = () => (
    movies.map(movie=>(
      <MovieCard
        key={movie.id}
        movie={movie}
        selectMovie={selectMovie}
      />
    ))
  )

  const searchMovies = (e) => {
    e.preventDefault()
    fetchMovies(searchKey)
  }

  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(vid => vid.name === 'Official Trailer')
    const key = trailer ? trailer.key : selectedMovie.videos.results[0].key

    return (
      <Youtube
        videoId={key}
        className={"youtube amru"}
        containerClassName={"youtube-container amru"}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
            controls: 0,
            // playsinline:0,
            cc_load_policy: 0,
            fs: 0,
            iv_load_policy: 0,
            modestbranding: 0,
            rel: 0,
            showinfo: 0,
            
          }
        }}
      />
    )
  }

  return (
    <div className="App">
      <header className={"center-max-size header"}>
      <span className={"brand"}>Robylon.ai Movie App</span>

        <form className="form" onSubmit={searchMovies}>
          <input className="search" type="text" id="searchInput" placeholder="Search for movies..." onChange={(e)=> setSearchKey(e.target.value)}/>
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
    </svg></button>
        </form>
      </header>

      <div className="poster" style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),url("${IMAGE_PATH}${selectedMovie.backdrop_path}")`}}>
        {console.log(selectedMovie)}

        {selectedMovie.videos && playTrailer ? renderTrailer() : null}
        {playTrailer ?  <button className={"button close-video"} onClick={() => setPlayTrailer(false)}>Close Trailer</button> : null}
        <div className="center-max-size" >
          <div className="poster-content">
          <button className={"button play-video"} type="button" onClick={() => setPlayTrailer(true)}>Play Trailer</button>
          <h1>{selectedMovie.title}</h1>
          <p>{selectedMovie.overview}</p>
          </div>
        </div>
      </div>

      <div className={"center-max-size container"}>
        {renderMovies()}
      </div>
    </div>
  );
}

export default App;
