import { request, apiUrl } from './config';
import { responseError } from './utils';

export async function orderApi(resource, id, type, page, pageSize, newOrderId) {
  const body = { type };
  if (type === 'changeOrderId') {
    if (typeof newOrderId !== 'number') {
      return Promise.reject('排序Id错误');
    }
    body.orderId = newOrderId;
  }

  try {
    const res = await request({
      url: `${apiUrl}${resource}/${id}/order`,
      method: 'PUT',
      body,
    });

    const { errcode, errmsg } = res.body;
    if ((errcode && errcode !== 0) || (errmsg && errmsg !== 'ok')) {
      return Promise.reject(responseError(res));
    }

    res.req = { resource, id, type, page, pageSize };

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}
