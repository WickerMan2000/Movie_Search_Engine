import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import InputContext from '../store/InputContext';
import styles from './Search.module.css';

const setTimer = duration => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    })
}

const errorCatchingFunction = errorFunction => fn => () => fn().catch(err => errorFunction(err.message));

const Search = React.memo(({ sendTypingState }) => {
    const { movies: { allMovies, inputMovie }, dispatch } = useContext(InputContext);
    const [searchingMovie, setSearchingMovie] = useState(inputMovie);
    const [movies, setMovies] = useState(allMovies);
    const [typing, setTyping] = useState(false);
    const searchingMovieRef = useRef('');
    const [_, setError] = useState(null);

    const searchingForAMovie = event => {
        const { value } = event.target;
        searchingMovieRef.current = value;
        setSearchingMovie(value);
        setTyping(true);
    }

    const getSearchingResult = useCallback(errorCatchingFunction(setError)(async () => {
        const allMovies = [];
        await setTimer(500);
        if (searchingMovieRef.current === searchingMovie) {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchingMovieRef.current}`);
            const data = await response.json();
            Object.values(data).forEach(element => Array.isArray(element) && element.forEach(movie => allMovies.push(movie)));
            setMovies(allMovies);
            setTyping(false);
        }
    }), [searchingMovie, typing]);

    useEffect(() => {
        getSearchingResult();
        sendTypingState(typing);
    }, [getSearchingResult, dispatch]);

    useEffect(() => {
        dispatch({ type: 'GET_ALL_MOVIES', movies: { allMovies: movies, inputMovie: searchingMovie } });
    }, [movies, dispatch]);

    return (
        <div className={styles.Search}>
            <input
                type="text"
                value={searchingMovie}
                ref={searchingMovieRef}
                className={styles.Input}
                onChange={searchingForAMovie}
            />
        </div>
    );
})

export default Search;