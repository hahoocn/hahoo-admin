import { request, apiUrl } from './config';
import { filterPage } from '../utils/filter';
import { responseError } from './utils';

export async function getListApi(url, page, pageSize) {
  const fPage = filterPage(page);
  if (fPage === -1) {
    return Promise.reject(responseError('页码错误'));
  }
  let qs = undefined;
  if (page) {
    qs = Object.assign({}, qs, { page });
  }
  if (pageSize) {
    qs = Object.assign({}, qs, { per_page: pageSize });
  }
  try {
    const res = await request({
      url: `${apiUrl}${url}`,
      method: 'GET',
      qs
    });

    const { errcode, errmsg } = res.body;
    if ((errcode && errcode !== 0) || (errmsg && errmsg !== 'ok')) {
      return Promise.reject(responseError(res));
    }
    res.body.page = fPage;
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}
