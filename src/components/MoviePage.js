import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../UI/Spinner';

const MoviePage = () => {
    const [movieDetails, setMovieDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    const getMovieDetails = useCallback(async () => {
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
    }, [id]);

    useEffect(() => {
        getMovieDetails();
    }, [getMovieDetails]);

    return (
        <Fragment>
            {isLoading ? <Spinner /> :
                <div style={{
                    'display': 'grid',
                    'gridTemplateColumns': 'repeat(2, 50%)',
                    'gridTemplateRows': 'repeat(4, 25%)'
                }}>
                    {
                        movieDetails.map(({ key, value }, index) =>
                            key === 'Poster' ?
                                <img style={{
                                    'display': 'grid',
                                    'gridColumn': '1 / 2',
                                    'gridRow': '1 / 4'
                                }}
                                    src={value} alt={""} /> :
                                <p style={{
                                    'display': 'grid',
                                    'gridColumn': '2 / 3',
                                    'gridRow': `${index + 1} / ${index + 2}`
                                }}>{value}</p>
                        )
                    }
                    <Link to={'/'} style={{
                        'color': 'blue',
                        'display': 'grid',
                        'gridColumn': '2 / 3',
                        'gridRow': '5 / 6',
                        'width': '20%',
                        'height': '20%'
                    }}>
                        <button>Back to movies</button>
                    </Link>
                </div>}
        </Fragment>
    );
}

export default MoviePage;