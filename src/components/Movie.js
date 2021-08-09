import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Movie.module.css';

const Movie = ({ movieTitle, id, poster }) => {

    return (
        <Fragment>
            <div key={id} className={styles.Movie}>
                <Link to={`/${id}`}>
                    <img src={poster} alt={movieTitle} />
                </Link>
            </div>
        </Fragment>
    );
}

export default Movie;