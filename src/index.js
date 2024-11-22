import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './Theme/ThemeContext';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store/store.js';
import { BrowserRouter, Routes, Route } from "react-router";
import TodoInput from './TodoInput';
import { Link } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider >
                <div className='around'>
                    <Link style={{ width: 100, height: 30, background: 'red' }} to={`/create/`}>
                        <button>Edit</button>
                    </Link>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/create" element={<TodoInput />} />
                    </Routes>
                </div>
            </ThemeProvider>
        </Provider>,
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
