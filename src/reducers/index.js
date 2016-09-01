import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import scml from './scml';
import mcml from './mcml';
import cate from './cate';

const rootReducer = combineReducers({
  routing: routerReducer,
  scml,
  mcml,
  cate,
});

export default rootReducer;
