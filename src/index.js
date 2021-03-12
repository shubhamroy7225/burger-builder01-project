import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import { Provider } from 'react-redux';
import {composeWithDevTools} from "redux-devtools-extension"
import burgerBuilderReducer from "./store/reducers/burgerBuilder/burgerBuilderReducer"
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
    burgerBuilderReducer,
})
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
const app = (
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
