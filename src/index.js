import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, HashRouter } from 'react-router-dom';
import Main from './components/Main';
import User from './components/User';
import { Provider} from 'react-redux';
import * as store from './store';

const setStore = store.default({})

ReactDOM.render(
    <Provider store={setStore}>
        <Router>
            <HashRouter>
                <App />
            </HashRouter>
        </ Router>
    </Provider>
, document.getElementById('root'));
