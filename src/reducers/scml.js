import { createReducer } from 'redux-act-reducer';
import {
  GET_LIST,
  REFRESH_LIST,
  LIST_STATUS,
  SWITCHING_PAGE,
  SWITCH_FLAG,
  SHOULD_UPDATE,
  DEL_ITEM,
  ORDER_ITEM
} from '../actions/scml';

const defaultState = {
  shouldUpdate: false,
  isSwitchingPage: false,
  listStatus: undefined,
  listUpdateTime: undefined,
  page: 0,
  totalCount: 0,
  itemCount: 0,
  items: []
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
    return {
      items: state.items.filter(item => item.id !== action.res.body.id)
    };
  },
  [ORDER_ITEM]() {
    return {};
  },
}, defaultState);

export default scml;
