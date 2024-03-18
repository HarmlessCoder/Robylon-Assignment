import React from 'react';

const MovieCard = ({ movie, selectMovie }) => {
    // Base URL for movie poster images
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342";

    // Render the movie card
    return (
        <div className={"movie"} onClick={() => selectMovie(movie)}>
            <div className="movie-title">
                {/* Render the movie poster if available */}
                {movie.poster_path && <img src={`${IMAGE_PATH}${movie.poster_path}`} alt={movie.title} />}
                
                <div className={"flex between movie-infos"}>
                    <h5 className={"movie-title"}>{movie.title}</h5>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
