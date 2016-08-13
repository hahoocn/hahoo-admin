import { request, apiUrl } from './config';
import { responseError } from './utils';

export async function publishApi(resource, id, isPublish) {
  const method = isPublish ? 'PUT' : 'DELETE';
  try {
    const res = await request({
      url: `${apiUrl}${resource}/${id}/publication`,
      method
    });

    const { errcode, errmsg } = res.body;
    if ((errcode && errcode !== 0) || (errmsg && errmsg !== 'ok')) {
      return Promise.reject(responseError(res));
    }

    res.req = { resource, id, isPublish };

    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}
