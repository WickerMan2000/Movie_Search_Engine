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
    const [message, setMessage] = useState('');
    const [_, setError] = useState(null);
    const searchingMovieRef = useRef('');

    const searchingForAMovie = event => {
        const { value } = event.target;
        searchingMovieRef.current = value;
        setSearchingMovie(value);
        setTyping(true);
        setMessage('');
    }

    const getSearchingResult = useCallback(errorCatchingFunction(setError)(async () => {
        const allMovies = [];
        await setTimer(1000);
        if (searchingMovieRef.current === searchingMovie) {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchingMovieRef.current.trim()}`);
            const data = await response.json();
            if (data.Response === 'True') {
                Object.values(data).forEach(element => Array.isArray(element) && element.forEach(movie => allMovies.push(movie)));
                setMessage('');
                setMovies(allMovies);
            } else {
                setMovies([]);
                setMessage(data.Error);
            }
            setTyping(false);
        }
    }), [searchingMovie, typing]);

    useEffect(() => {
        getSearchingResult();
        sendTypingState(typing);
    }, [getSearchingResult, dispatch]);

    useEffect(() => {
        dispatch({ type: 'GET_ALL_MOVIES', movies: { allMovies: movies, inputMovie: searchingMovie, warning: message } });
    }, [movies, message, dispatch]);

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