import { useReducer } from 'react';
import InputContext from './InputContext';

const initialState = { movies: { allMovies: [], inputMovie: '', warning: '' } };
const { Provider } = InputContext;

const InputContextProvider = ({ children }) => {
    const [inputState, dispatchInput] = useReducer((_, action) => {
        if (action.type === 'GET_ALL_MOVIES') {
            return {
                movies: action.movies
            }
        }
        return initialState;
    }, initialState)

    const inputContext = {
        movies: inputState.movies,
        dispatch: dispatchInput
    }

    return (
        <Provider value={inputContext}>
            {children}
        </Provider>
    )
}

export default InputContextProvider;