import React, { useContext } from 'react';
import InputContext from '../store/InputContext';
import Movie from './Movie';

const MovieList = React.memo(() => {
    const { movies: { allMovies } } = useContext(InputContext);

    return (
        <div styles={{
            "margin-top": "200px",
            "margin-left": "100px"
        }}>
            {allMovies.map(({ Title, imdbID, Poster }) =>
                <Movie
                    id={imdbID}
                    movieTitle={Title}
                    poster={Poster} />)}
        </div >
    );
})

export default MovieList;