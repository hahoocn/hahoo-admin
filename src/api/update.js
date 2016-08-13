import { request, apiUrl } from './config';
import { responseError } from './utils';

export async function addApi(resource, body) {
  try {
    const res = await request({
      url: `${apiUrl}${resource}`,
      method: 'POST',
      body,
    });
    const { errcode, errmsg } = res.body;
    if ((errcode && errcode !== 0) || (errmsg && errmsg !== 'ok')) {
      return Promise.reject(responseError(res));
    }

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function updateApi(resource, id, body) {
  if (!id || id <= 0) {
    return Promise.reject('Id错误');
  }

  try {
    const res = await request({
      url: `${apiUrl}${resource}/${id}`,
      method: 'PUT',
      body,
    });

    const { errcode, errmsg } = res.body;
    if ((errcode && errcode !== 0) || (errmsg && errmsg !== 'ok')) {
      return Promise.reject(responseError(res));
    }

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}
