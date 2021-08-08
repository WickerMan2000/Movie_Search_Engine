import ReactDOM from 'react-dom';
import InputContextProvider from './store/InputContextProvider';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <InputContextProvider>
            <App />
        </InputContextProvider>
    </BrowserRouter>,
    document.getElementById('root')
);