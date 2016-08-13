import { createAction, createActionAsync } from 'redux-act-reducer';
import { getListApi,
  publishApi,
  deleteApi,
  orderApi,
  getDetailsApi,
  addApi,
  updateApi
} from '../api';

export const LIST_STATUS = 'LIST_STATUS';
export const SHOULD_UPDATE = 'SHOULD_UPDATE';
export const SCROLL_POSITION = 'SCROLL_POSITION';
export const CLEAN_ERROR = 'CLEAN_ERROR';
export const CLEAN_LOADING = 'CLEAN_LOADING';

export const GET_LIST = 'GET_LIST';
export const PUBLISH = 'PUBLISH';
export const DELETE = 'DELETE';
export const ORDER = 'ORDER';
export const GET_DETAILS = 'GET_DETAILS';
export const GET_EDIT_DETAILS = 'GET_EDIT_DETAILS';
export const ADD = 'ADD';
export const UPDATE = 'UPDATE';
export const SET_ERROR = 'SET_ERROR';

export const setListStatus = createAction(LIST_STATUS, 'status');
export const shouldUpdate = createAction(SHOULD_UPDATE, 'shouldUpdate');
export const getScrollPosition = createAction(SCROLL_POSITION, 'scrollY');
export const cleanError = createAction(CLEAN_ERROR);
export const cleanLoading = createAction(CLEAN_LOADING);
export const setError = createAction(SET_ERROR, 'error');

export const getList = createActionAsync(GET_LIST, getListApi, {
  onRequest(dispatch) {
    dispatch(shouldUpdate(true));
  },
  onSuccess(dispatch) {
    dispatch(shouldUpdate(false));
  }
});

export const publish = createActionAsync(PUBLISH, publishApi, {
  onRequest(dispatch) {
    dispatch(shouldUpdate(true));
  },
  onSuccess(dispatch) {
    dispatch(shouldUpdate(false));
  }
});

export const del = createActionAsync(DELETE, deleteApi, {
  onRequest(dispatch) {
    dispatch(shouldUpdate(true));
  },
  onSuccess(dispatch) {
    dispatch(shouldUpdate(false));
  }
});

export const order = createActionAsync(ORDER, orderApi, {
  onRequest(dispatch) {
    dispatch(shouldUpdate(true));
  },
  onSuccess(dispatch, res) {
    dispatch(shouldUpdate(false));
    const { resource, page, pageSize } = res.req;
    dispatch(getList(resource, page, pageSize));
  }
});

export const getDetails = createActionAsync(GET_DETAILS, getDetailsApi, {
  onRequest(dispatch) {
    dispatch(shouldUpdate(true));
  },
  onSuccess(dispatch) {
    dispatch(shouldUpdate(false));
  }
});

export const getEditDetails = createActionAsync(GET_EDIT_DETAILS, getDetailsApi);
export const add = createActionAsync(ADD, addApi);
export const update = createActionAsync(UPDATE, updateApi);
