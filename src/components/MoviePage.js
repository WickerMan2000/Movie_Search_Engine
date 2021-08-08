import React, { Fragment, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import InputContext from '../store/InputContext';

const MoviePage = () => {
    const { id } = useParams();
    const { movieDetails } = useContext(InputContext);

    return (
        <Fragment>
            <Link to={'/'}>
                <button>Back to movies</button>
            </Link>
            <div>{id}</div>
            <h1>{movieDetails.movieTitle}</h1>
        </Fragment>
    );
}

export default MoviePage;