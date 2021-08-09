import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../UI/Spinner';

const errorCatchingFunction = errorFunction => fn => () => fn().catch(err => errorFunction(err.message));

const MoviePage = () => {
    const [movieDetails, setMovieDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams();

    const getMovieDetails = useCallback(errorCatchingFunction(setError)(async () => {
        setIsLoading(true);
        const movieData = [];
        const result = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}&plot=full`);
        const data = await result.json();
        Object.entries(data).forEach(([key, value]) =>
            (key === 'Title' ||
                key === 'Poster' ||
                key === 'Year' ||
                key === 'Plot')
            && movieData.push({ key, value }));
        setMovieDetails(movieData);
        setIsLoading(false);
    }), [id]);

    useEffect(() => {
        getMovieDetails();
    }, [getMovieDetails]);

    return (
        <Fragment>
            {
                isLoading && !error ? <Spinner /> :
                    !error ?
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 50%)',
                            gridTemplateRows: 'repeat(5%, 5%, 85%, 5%)'
                        }}>
                            {
                                movieDetails.map(({ key, value }, index) =>
                                    key === 'Poster' ?
                                        <img style={{
                                            display: 'grid',
                                            gridColumn: '1 / 2',
                                            gridRow: '1 / 4',
                                            marginLeft: '300px',
                                            marginTop: '40px',
                                            height: '600px'
                                        }}
                                            src={value} alt={""} /> :
                                        <p style={{
                                            display: 'grid',
                                            gridColumn: '2 / 3',
                                            gridRow: `${index + 1} / ${index + 2}`,
                                            marginRight: '400px',
                                            fontSize: key !== 'Plot' && '30px'
                                        }}>{value}</p>
                                )
                            }
                            <Link to={'/'} style={{
                                display: 'grid',
                                gridColumn: '2 / 3',
                                gridRow: '5 / 6',
                                width: '15%',
                                height: '20%',
                                textDecoration: "none"
                            }}>
                                <button style={{
                                    borderRadius: '16px',
                                    backgroundColor: '#6ebef7',
                                    color: 'white',
                                    cursor: 'pointer',
                                    height: '50px',
                                    fontSize: 'medium'
                                }}>Back to movies</button>
                            </Link>
                        </div> :
                        <p style={{
                            color: 'red',
                            marginLeft: '500px',
                            marginTop: '200px',
                            fontSize: '100px'
                        }}>{error}</p>
            }
        </Fragment>
    );
}

export default MoviePage;