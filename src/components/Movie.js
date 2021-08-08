import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import InputContext from '../store/InputContext';

const Movie = ({ movieTitle, id, poster }) => {
    const { dispatch } = useContext(InputContext);

    const sendMovieDetails = () => {
        dispatch({ type: 'MOVIE_DETAILS', movieDetails: { movieTitle: movieTitle, id: id, poster: poster } })
    }

    return (
        <Fragment>
            <div key={id}>
                <Link to={`/${id}`}>
                    <img src={poster} alt={movieTitle} onClick={sendMovieDetails} />
                </Link>
            </div>
        </Fragment>
    );
}

export default Movie;