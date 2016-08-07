import { createReducer } from 'redux-act-reducer';
import {
  GET_LIST,
  REFRESH_LIST,
  LIST_STATUS,
  SWITCH_FLAG,
  SHOULD_UPDATE,
  DEL_ITEM,
  ORDER_ITEM,
  GET_DETAILS,
  GET_EDIT_DETAILS,
  SCROLL_POSITION,
  EDIT,
  CLEAN_ASYNC_STATUS
} from '../actions/scml';

const defaultState = {
  shouldUpdate: false,
  listStatus: undefined,
  listUpdateTime: undefined,
  page: 0,
  totalCount: 0,
  itemCount: 0,
  scrollY: 0,
  items: [],
  details: undefined,
  asyncStatus: undefined
};

const scml = createReducer({
  [LIST_STATUS](state, action) {
    return {
      listStatus: action.status
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
    return {
      details: state.details && state.details.id && state.details.id === action.res.body.id ?
        undefined : state.details,
      items: state.items.map(item => (item.id === action.res.body.id ?
        Object.assign({}, item, { [action.res.body.flagName]: action.res.body.flag }) : item))
    };
  },
  [SHOULD_UPDATE](state, action) {
    return {
      shouldUpdate: action.shouldUpdate
    };
  },
  [DEL_ITEM](state, action) {
    return {
      details: state.details && state.details.id && state.details.id === action.res.body.id ?
        undefined : state.details,
      items: state.items.filter(item => item.id !== action.res.body.id)
    };
  },
  [ORDER_ITEM]() {
    return {
      details: undefined
    };
  },
  [GET_DETAILS](state, action) {
    return {
      details: action.res.body
    };
  },
  [GET_EDIT_DETAILS](state, action) {
    return {
      details: action.res.body
    };
  },
  [SCROLL_POSITION](state, action) {
    return {
      scrollY: action.scrollY
    };
  },
  [EDIT](state, action) {
    return {
      page: action.res.body.id > 0 ? state.page : 1,
      items: [],
      details: action.res.body.id > 0 && state.details && state.details.id &&
        state.details.id === action.res.body.id ?
        Object.assign({}, state.details, action.res.body) :
        state.details
    };
  },
  [CLEAN_ASYNC_STATUS](state, action) {
    return {
      asyncStatus: action.asyncName ?
        Object.assign({}, state.asyncStatus, { ...{ [action.asyncName]: undefined } }) :
        undefined
    };
  },
}, defaultState);

export default scml;
