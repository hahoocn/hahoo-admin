import { createAction, createActionAsync } from 'redux-act-reducer';
import { request, apiUrl } from './config';
import { filterPage, filterId } from '../utils/filter';

export const GET_LIST = 'GET_LIST';
export const LIST_STATUS = 'LIST_STATUS';
export const SWITCH_FLAG = 'SWITCH_FLAG';
export const SHOULD_UPDATE = 'SHOULD_UPDATE';
export const DEL_ITEM = 'DEL_ITEM';
export const ORDER_ITEM = 'ORDER_ITEM';
export const GET_DETAILS = 'GET_DETAILS';
export const GET_EDIT_DETAILS = 'GET_EDIT_DETAILS';
export const SCROLL_POSITION = 'SCROLL_POSITION';
export const EDIT = 'EDIT';
export const CLEAN_ASYNC_STATUS = 'CLEAN_ASYNC_STATUS';

export const setListStatus = createAction(LIST_STATUS, 'status');
export const shouldUpdate = createAction(SHOULD_UPDATE, 'shouldUpdate');
export const getScrollPosition = createAction(SCROLL_POSITION, 'scrollY');
export const cleanAsyncStatus = createAction(CLEAN_ASYNC_STATUS, 'asyncName');

async function getListApi(page, pageSize) {
  const newpage = filterPage(page);
  if (newpage === -1) {
    return Promise.reject('页码错误');
  }

  try {
    const res = await request({
      url: `${apiUrl}/scml/list`,
      method: 'POST',
      body: {
        offset: (newpage - 1) * pageSize,
        count: pageSize
      },
    });

    if (res.body.errmsg && res.body.errmsg !== 'ok') {
      return Promise.reject(res.body.errmsg);
    }
    res.body.page = newpage;
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const getList = createActionAsync(GET_LIST, getListApi, {
  name: 'list',
  onRequest(dispatch) {
    dispatch(shouldUpdate(true));
  },
  onSuccess(dispatch) {
    dispatch(shouldUpdate(false));
  }
});

async function switchFlagApi(id, flagName, flag) {
  try {
    const res = await request({
      url: `${apiUrl}/scml/switchflag`,
      method: 'POST',
      body: {
        id,
        flagName,
        flag
      },
    });

    if (res.body.errmsg) {
      return Promise.reject(res.body.errmsg);
    }

    if (!(res.body.response && res.body.response === 'success')) {
      return Promise.reject('遇到错误');
    }

    res.body.id = id;
    res.body.flagName = flagName;
    res.body.flag = flag;

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const switchFlag = createActionAsync(SWITCH_FLAG, switchFlagApi, {
  name: 'switchFlag',
  onRequest(dispatch) {
    dispatch(shouldUpdate(true));
  },
  onSuccess(dispatch) {
    dispatch(shouldUpdate(false));
  }
});

async function delItemApi(id) {
  try {
    const res = await request({
      url: `${apiUrl}/scml/delete`,
      method: 'POST',
      body: {
        id
      },
    });

    if (res.body.errmsg) {
      return Promise.reject(res.body.errmsg);
    }

    if (!(res.body.response && res.body.response === 'success')) {
      return Promise.reject('遇到错误');
    }

    res.body.id = id;

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const delItem = createActionAsync(DEL_ITEM, delItemApi, {
  name: 'delItem',
  onRequest(dispatch) {
    dispatch(shouldUpdate(true));
  },
  onSuccess(dispatch) {
    dispatch(shouldUpdate(false));
  }
});

async function orderApi(id, type, page, pageSize, newOrderId) {
  const body = {
    id,
    type
  };
  if (type === 'changeOrderId') {
    if (typeof newOrderId !== 'number') {
      return Promise.reject('排序Id错误');
    }
    body.orderId = newOrderId;
  }

  try {
    const res = await request({
      url: `${apiUrl}/scml/order`,
      method: 'POST',
      body,
    });

    if (res.body.errmsg) {
      return Promise.reject(res.body.errmsg);
    }

    if (!(res.body.response && res.body.response === 'success')) {
      return Promise.reject('遇到错误');
    }

    res.body.id = id;
    res.body.type = type;
    res.body.page = page;
    res.body.pageSize = pageSize;

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const order = createActionAsync(ORDER_ITEM, orderApi, {
  name: 'order',
  onRequest(dispatch) {
    dispatch(shouldUpdate(true));
  },
  onSuccess(dispatch, res) {
    dispatch(shouldUpdate(false));
    dispatch(getList(res.body.page, res.body.pageSize));
  }
});

async function getDetailsApi(id) {
  const newId = filterId(id);
  if (newId === -1) {
    return Promise.reject('Id错误');
  }

  try {
    const res = await request({
      url: `${apiUrl}/scml/details`,
      method: 'GET',
      qs: {
        id: newId
      },
    });

    if (res.body.errmsg && res.body.errmsg !== 'ok') {
      return Promise.reject(res.body.errmsg);
    }

    res.body.receivedAt = Date.now();

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const getDetails = createActionAsync(GET_DETAILS, getDetailsApi, {
  name: 'details',
  onRequest(dispatch) {
    dispatch(shouldUpdate(true));
  },
  onSuccess(dispatch) {
    dispatch(shouldUpdate(false));
  }
});

export const getEditDetails = createActionAsync(GET_EDIT_DETAILS, getDetailsApi, {
  name: 'editdetails'
});

async function editApi(body) {
  const newId = parseInt(`${body.id}`, 10);
  if (isNaN(newId) || newId < 0) {
    return Promise.reject('Id错误');
  }

  let actType = 'add';
  if (newId > 0) {
    actType = 'update';
  }
  try {
    const res = await request({
      url: `${apiUrl}/scml/${actType}`,
      method: 'POST',
      body,
    });

    if (res.body.errmsg) {
      return Promise.reject(res.body.errmsg);
    }

    if (!(res.body.response && res.body.response === 'success')) {
      return Promise.reject('遇到错误');
    }

    res.body = body;
    res.body.updateTime = Date.now();
    res.body.receivedAt = Date.now();

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const edit = createActionAsync(EDIT, editApi, {
  name: 'edit'
});
