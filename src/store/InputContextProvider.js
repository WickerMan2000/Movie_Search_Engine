import { useReducer } from 'react';
import InputContext from './InputContext';

const initialState = { movies: { allMovies: [], inputMovie: '' }, movieDetails: {} };
const { Provider } = InputContext;

const InputContextProvider = ({ children }) => {
    const [inputState, dispatchInput] = useReducer((state, action) => {
        if (action.type === 'GET_ALL_MOVIES') {
            return {
                ...state,
                movies: action.movies
            }
        }
        if (action.type === 'MOVIE_DETAILS') {
            return {
                ...state,
                movieDetails: action.movieDetails
            }
        }
        return initialState;
    }, initialState)

    const inputContext = {
        movies: inputState.movies,
        movieDetails: inputState.movieDetails,
        dispatch: dispatchInput
    }

    return (
        <Provider value={inputContext}>
            {children}
        </Provider>
    )
}

export default InputContextProvider;