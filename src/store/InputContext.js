import React from 'react';

const InputContext = React.createContext({
    movies: { allMovies: [], inputMovie: '' },
    movieDetails: {},
    dispatch: () => { }
})

export default InputContext;