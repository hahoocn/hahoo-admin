import { createReducer } from 'redux-act-reducer';
import {
  GET_LIST,
  LIST_STATUS,
  REFRESH_LIST,
  PUBLISH,
  SHOULD_UPDATE,
  DELETE,
  ORDER,
  GET_DETAILS,
  GET_EDIT_DETAILS,
  SCROLL_POSITION,
  ADD,
  UPDATE,
  CLEAN_ASYNC_STATUS,
  CLEAN_ERROR,
  CLEAN_LOADING,
  SET_ERROR,
  GET_CATE
} from '../actions/mcml';

const loadingRequest = { isLoading: true, error: undefined };
const loadingFailure = err => ({ isLoading: false, error: err });
const updatingRequest = { isUpdating: true, error: undefined };
const updatingFailure = err => ({ isUpdating: false, error: err });

const defaultState = {
  isLoading: false,
  isUpdating: false,
  error: undefined,
  shouldUpdate: false,
  listStatus: 'ok',
  listUpdateTime: undefined,
  page: 0,
  totalCount: 0,
  itemCount: 0,
  scrollY: 0,
  items: [],
  details: undefined,
  cates: []
};

const mcml = createReducer({
  [GET_LIST](state, action) {
    return {
      'REQUEST'() {
        return loadingRequest;
      },
      'SUCCESS'() {
        return {
          isLoading: false,
          error: undefined,
          listUpdateTime: action.receivedAt,
          ...action.res.body
        };
      },
      'FAILURE'() {
        return loadingFailure(action.err);
      }
    };
  },
  [LIST_STATUS](state, action) {
    return {
      listStatus: action.status
    };
  },
  [REFRESH_LIST](state, action) {
    return {
      listUpdateTime: action.receivedAt,
      ...action.res.body
    };
  },
  [PUBLISH](state, action) {
    return {
      'REQUEST'() {
        return updatingRequest;
      },
      'SUCCESS'() {
        return {
          isUpdating: false,
          error: undefined,
          details: state.details && state.details.id && state.details.id === action.res.req.id ?
            undefined : state.details,
          items: state.items.map(item => (item.id === action.res.req.id ?
            Object.assign({}, item, { isPublish: action.res.req.isPublish ? 1 : 0 }) : item))
        };
      },
      'FAILURE'() {
        return updatingFailure(action.err);
      }
    };
  },
  [SHOULD_UPDATE](state, action) {
    return {
      shouldUpdate: action.shouldUpdate
    };
  },
  [DELETE](state, action) {
    return {
      'REQUEST'() {
        return updatingRequest;
      },
      'SUCCESS'() {
        return {
          isUpdating: false,
          error: undefined,
          totalCount: state.totalCount - 1,
          details: state.details && state.details.id && state.details.id === action.res.req.id ?
            undefined : state.details,
          items: state.items.filter(item => item.id !== action.res.req.id)
        };
      },
      'FAILURE'() {
        return updatingFailure(action.err);
      }
    };
  },
  [ORDER](state, action) {
    return {
      'REQUEST'() {
        return updatingRequest;
      },
      'SUCCESS'() {
        return {
          isUpdating: false,
          error: undefined,
          details: undefined
        };
      },
      'FAILURE'() {
        return updatingFailure(action.err);
      }
    };
  },
  [GET_DETAILS](state, action) {
    return {
      'REQUEST'() {
        return loadingRequest;
      },
      'SUCCESS'() {
        return {
          isLoading: false,
          error: undefined,
          details: action.res.body
        };
      },
      'FAILURE'() {
        return loadingFailure(action.err);
      }
    };
  },
  [GET_EDIT_DETAILS](state, action) {
    return {
      'REQUEST'() {
        return loadingRequest;
      },
      'SUCCESS'() {
        return {
          isLoading: false,
          error: undefined,
          details: action.res[0].body,
          ...action.res[1].body
        };
      },
      'FAILURE'() {
        return loadingFailure(action.err);
      }
    };
  },
  [SCROLL_POSITION](state, action) {
    return {
      scrollY: action.scrollY
    };
  },
  [ADD](state, action) {
    return {
      'REQUEST'() {
        return updatingRequest;
      },
      'SUCCESS'() {
        return {
          isUpdating: false,
          error: undefined,
          page: 1,
          items: []
        };
      },
      'FAILURE'() {
        return updatingFailure(action.err);
      }
    };
  },
  [UPDATE](state, action) {
    return {
      'REQUEST'() {
        return updatingRequest;
      },
      'SUCCESS'() {
        return {
          isUpdating: false,
          error: undefined,
          items: [],
          details: state.details && state.details.id && state.details.id === action.res.body.id ?
            Object.assign({}, state.details, action.res.body) : state.details
        };
      },
      'FAILURE'() {
        return updatingFailure(action.err);
      }
    };
  },
  [CLEAN_ASYNC_STATUS](state, action) {
    return {
      asyncStatus: action.asyncName ?
        Object.assign({}, state.asyncStatus, { ...{ [action.asyncName]: undefined } }) :
        {}
    };
  },
  [CLEAN_ERROR]() {
    return {
      error: undefined
    };
  },
  [CLEAN_LOADING]() {
    return {
      isLoading: false,
      isUpdating: false
    };
  },
  [SET_ERROR](state, action) {
    return {
      error: action.error
    };
  },
  [GET_CATE](state, action) {
    return {
      'REQUEST'() {
        return loadingRequest;
      },
      'SUCCESS'() {
        return {
          isLoading: false,
          error: undefined,
          ...action.res.body
        };
      },
      'FAILURE'() {
        return loadingFailure(action.err);
      }
    };
  }
}, defaultState);

export default mcml;
