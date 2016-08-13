export function responseError(res) {
  let result = {
    status: 0,
    statusText: '',
    errcode: 1
  };
  if (typeof res === 'string') {
    result = Object.assign({}, result, { errmsg: res });
  }
  if (typeof res === 'object') {
    result = {
      status: res.status,
      statusText: res.statusText,
      errcode: res.body.errcode,
      errmsg: res.body.errmsg
    };
  }
  return result;
}
