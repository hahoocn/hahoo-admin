import { createAction, createActionAsync } from 'redux-act-reducer';
import { getListApi,
  publishApi,
  deleteApi,
  orderApi,
  getDetailsApi,
  addApi,
  updateApi
} from '../api';
const prefix = 'MCML';

export const LIST_STATUS = `${prefix}_LIST_STATUS`;
export const SHOULD_UPDATE = `${prefix}_SHOULD_UPDATE`;
export const SCROLL_POSITION = `${prefix}_SCROLL_POSITION`;
export const CLEAN_ERROR = `${prefix}_CLEAN_ERROR`;
export const CLEAN_LOADING = `${prefix}_CLEAN_LOADING`;

export const GET_LIST = `${prefix}_GET_LIST`;
export const PUBLISH = `${prefix}_PUBLISH`;
export const DELETE = `${prefix}_DELETE`;
export const ORDER = `${prefix}_ORDER`;
export const GET_DETAILS = `${prefix}_GET_DETAILS`;
export const GET_EDIT_DETAILS = `${prefix}_GET_EDIT_DETAILS`;
export const ADD = `${prefix}_ADD`;
export const UPDATE = `${prefix}_UPDATE`;
export const SET_ERROR = `${prefix}_SET_ERROR`;
export const GET_CATE = `${prefix}_GET_CATE`;

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

function getEditData(resource, id, cateResource) {
  return Promise.all([getDetailsApi(resource, id), getListApi(cateResource)]);
}
export const getEditDetails = createActionAsync(GET_EDIT_DETAILS, getEditData);
export const add = createActionAsync(ADD, addApi);
export const update = createActionAsync(UPDATE, updateApi);
export const getCate = createActionAsync(GET_CATE, getListApi);
