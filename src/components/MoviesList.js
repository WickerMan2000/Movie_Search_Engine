import React, { useContext } from 'react';
import InputContext from '../store/InputContext';
import Movie from './Movie';
import styles from './MoviesList.module.css';

const MovieList = React.memo(() => {
    const { movies: { allMovies, warning } } = useContext(InputContext);

    return (
        <div className={styles.MoviesList}>
            {warning ? <p className={styles.Warning}>{warning}</p> :
                allMovies.map(({ Title, imdbID, Poster }) =>
                    <Movie
                        id={imdbID}
                        movieTitle={Title}
                        poster={Poster} />)}
        </div >
    );
})

export default MovieList;