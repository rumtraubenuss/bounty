import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import * as reducers from './reducers';

const store = createStore(
  combineReducers({ ...reducers }),
  {}
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
