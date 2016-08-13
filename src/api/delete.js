import { request, apiUrl } from './config';
import { responseError } from './utils';

export async function deleteApi(resource, id) {
  try {
    const res = await request({
      url: `${apiUrl}${resource}/${id}`,
      method: 'DELETE'
    });

    const { errcode, errmsg } = res.body;
    if ((errcode && errcode !== 0) || (errmsg && errmsg !== 'ok')) {
      return Promise.reject(responseError(res));
    }

    res.req = { id };

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}
