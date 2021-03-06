import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import hashHistory from 'react-router/lib/hashHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';

/* eslint no-underscore-dangle: 0 */
const initialState = {};
const store = configureStore(initialState);
const history = syncHistoryWithStore(hashHistory, store);

const rootEl = document.getElementById('container');

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes(store)} history={history} />
  </Provider>,
  rootEl
);
