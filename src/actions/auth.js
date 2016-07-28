// import { createAction, createActionAsync } from 'redux-act-reducer';
// import request from 'hahoorequest/lib/fetch';

export const AUTH_LOAD = 'AUTH_LOAD';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export function isAuth() {
  return true;
  // return globalState.auth && globalState.auth.token;
}
