import { createReducer } from 'redux-act-reducer';
import {
  GET_LIST,
  REFRESH_LIST,
  LIST_STATUS,
  SWITCHING_PAGE,
  SWITCH_FLAG,
  SHOULD_UPDATE,
  DEL_ITEM,
  ORDER_ITEM,
  GET_DETAILS,
  SCROLL_POSITION
} from '../actions/scml';

const defaultState = {
  shouldUpdate: false,
  isSwitchingPage: false,
  listStatus: undefined,
  listUpdateTime: undefined,
  page: 0,
  totalCount: 0,
  itemCount: 0,
  items: [],
  details: undefined
};

const scml = createReducer({
  [LIST_STATUS](state, action) {
    return {
      listStatus: action.status
    };
  },
  [SWITCHING_PAGE](state, action) {
    return {
      isSwitchingPage: action.isSwitchingPage
    };
  },
  [GET_LIST](state, action) {
    return {
      listUpdateTime: action.receivedAt,
      ...action.res.body
    };
  },
  [REFRESH_LIST](state, action) {
    return {
      listUpdateTime: action.receivedAt,
      ...action.res.body
    };
  },
  [SWITCH_FLAG](state, action) {
    const obj = {};
    obj[action.res.body.flagName] = action.res.body.flag;
    return {
      items: state.items.map(item => (item.id === action.res.body.id ?
        Object.assign({}, item, obj) : item))
    };
  },
  [SHOULD_UPDATE](state, action) {
    return {
      shouldUpdate: action.shouldUpdate
    };
  },
  [DEL_ITEM](state, action) {
    const result = {
      items: state.items.filter(item => item.id !== action.res.body.id)
    };
    if (state.details && parseInt(state.details.id, 10) === action.res.body.id) {
      result.details = undefined;
    }
    return result;
  },
  [ORDER_ITEM]() {
    return {};
  },
  [GET_DETAILS](state, action) {
    return {
      details: action.res.body
    };
  },
  [SCROLL_POSITION](state, action) {
    return {
      scrollY: action.scrollY
    };
  }
}, defaultState);

export default scml;
