import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import scml from './scml';

const rootReducer = combineReducers({
  routing: routerReducer,
  scml,
});

export default rootReducer;
