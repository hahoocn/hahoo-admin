import { createAction, createActionAsync } from 'redux-act-reducer';
import { request, apiUrl } from './config';
import { filterPage } from '../utils/filter';

export const GET_LIST = 'GET_LIST';
export const REFRESH_LIST = 'REFRESH_LIST';
export const LIST_STATUS = 'LIST_STATUS';
export const SWITCHING_PAGE = 'SWITCHING_PAGE';
export const SWITCH_FLAG = 'SWITCH_FLAG';
export const SHOULD_UPDATE = 'SHOULD_UPDATE';
export const DEL_ITEM = 'DEL_ITEM';
export const ORDER_ITEM = 'ORDER_ITEM';

export const setListStatus = createAction(LIST_STATUS, 'status');
export const switchingPage = createAction(SWITCHING_PAGE, 'isSwitchingPage');
export const shouldUpdate = createAction(SHOULD_UPDATE, 'shouldUpdate');

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
    res.body.page = newpage;
    res.body.listStatus = 'updated';

    if (res.body.errmsg && res.body.errmsg !== 'ok') {
      return Promise.reject(res.body.errmsg);
    }

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}

export const getList = createActionAsync(GET_LIST, getListApi, {
  name: 'list',
  onRequest(dispatch) {
    dispatch(switchingPage(true));
  }
});

export const refreshList = createActionAsync(REFRESH_LIST, getListApi, {
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
    dispatch(refreshList(res.body.page, res.body.pageSize));
  }
});
