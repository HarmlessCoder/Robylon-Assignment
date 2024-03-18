import React from 'react';

const MovieCard = ({movie})=> {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"
    console.log(movie)
    return(
        <div className={"movie-card"}>
            {movie.poster_path ? <img src={`${IMAGE_PATH}${movie.poster_path}`} alt='' />
                : null
            }
            <h5>{movie.title}</h5>
        </div>
    );
};

export default MovieCard;