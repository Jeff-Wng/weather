import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import weatherReducer from './store/Reducers/weatherReducer';
import authReducer from './store/Reducers/authReducer';
import savedReducer from './store/Reducers/savedReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    weather: weatherReducer,
    auth: authReducer,
    saved: savedReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
)

ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
