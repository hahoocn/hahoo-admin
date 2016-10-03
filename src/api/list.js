import { request, apiUrl } from './config';
import { filterPage } from '../utils/filter';
import { responseError } from './utils';

export async function getListApi(url, page, pageSize, othQs) {
  let fPage;
  if (page && typeof page !== 'function') {
    fPage = filterPage(page);
    if (fPage === -1) {
      return Promise.reject(responseError('页码错误'));
    }
  }
  let qs;
  if (fPage) {
    qs = Object.assign({}, qs, { page: fPage });
  }
  if (pageSize && typeof pageSize !== 'function') {
    qs = Object.assign({}, qs, { per_page: pageSize });
  }
  if (othQs && typeof othQs !== 'function') {
    qs = Object.assign({}, qs, othQs);
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
    if (fPage) {
      res.body.page = fPage;
    }
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
}
