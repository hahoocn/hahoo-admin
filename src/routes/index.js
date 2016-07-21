import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Home, Login, NotFound } from '../containers';
import { About } from '../components';
import { isAuth } from '../actions/auth';

export default function Routes(store) {
  const requireLogin = (nextState, replace, cb) => {
    if (!isAuth(store.getState())) {
      replace('/login');
    }
    cb();
  };

  return (
    <Route path="/" component={App}>
      <Route onEnter={requireLogin}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
      </Route>
      <Route path="login" component={Login} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
}
