import React from 'react';
import ToastAlert from '../hahoo/ToastAlert/ToastAlert';

class ShowError extends React.Component {
  static propTypes = {
    onClose: React.PropTypes.func,
    error: React.PropTypes.object,
  }

  state = {}

  render() {
    const { error, onClose, ...rest } = this.props;
    const { errcode, errmsg, status } = error;
    let errorMsg;
    if (errcode && errcode === -1) {
      errorMsg = '遇到错误';
    }
    if (!errorMsg && (!errmsg || errmsg.length === 0) && status) {
      if (status >= 400 && status < 500) {
        errorMsg = '遇到错误,请刷新重试';
      } else if (status >= 500 && status < 600) {
        errorMsg = '服务器错误';
      }

      switch (status) {
        case 400:
          errorMsg = '请求错误,请刷新重试';
          break;
        case 401:
          errorMsg = '没有权限';
          break;
        case 403:
          errorMsg = '禁止访问';
          break;
        case 404:
          errorMsg = '无法访问';
          break;
        default:
      }
    }
    if (!errorMsg && errmsg && errmsg !== 'ok') {
      errorMsg = errmsg;
    }
    if (!errorMsg) {
      errorMsg = '遇到错误';
    }
    return (
      <ToastAlert info={errorMsg} onClose={onClose} {...rest} />
    );
  }
}

export default ShowError;
