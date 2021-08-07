import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Search.module.css';

const setTimer = duration => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    })
}

const errorCatchingFunction = errorFunction => fn => () => fn().catch(err => errorFunction(err.message));

const Search = () => {
    const [searchingMovie, setSearchingMovie] = useState('');
    const searchingMovieRef = useRef('');
    const [movies, setMovies] = useState([]);
    const [_, setError] = useState(null);

    const searchingForAMovie = event => {
        const { value } = event.target;
        searchingMovieRef.current = value;
        setSearchingMovie(value);
    }

    const getSearchingResult = useCallback(errorCatchingFunction(setError)(async () => {
        await setTimer(1500);
        if (searchingMovieRef.current === searchingMovie) {
            const response = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchingMovieRef.current}`);
            const data = await response.json();
            setMovies(data);
        }
    }), [searchingMovie]);

    useEffect(() => {
        getSearchingResult();
    }, [getSearchingResult]);

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
}

export default Search;