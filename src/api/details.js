import { request, apiUrl } from './config';
import { responseError } from './utils';
import { filterId } from '../utils/filter';

export async function getDetailsApi(resource, id) {
  const newId = filterId(id);
  if (newId === -1) {
    return Promise.reject('Id错误');
  }

  try {
    const res = await request({
      url: `${apiUrl}${resource}/${newId}`,
      method: 'GET'
    });

    const { errcode, errmsg } = res.body;
    if ((errcode && errcode !== 0) || (errmsg && errmsg !== 'ok')) {
      return Promise.reject(responseError(res));
    }

    res.body.receivedAt = Date.now();

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}
