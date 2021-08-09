import React from 'react';

const InputContext = React.createContext({
    movies: { allMovies: [], inputMovie: '', warning: '' },
    dispatch: () => { }
})

export default InputContext;