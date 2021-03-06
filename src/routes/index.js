import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import {
  App,
  Home,
  Login,
  NotFound,
  Scml,
  ScmlEdit,
  ScmlView,
  Mcml,
  McmlView,
  McmlEdit,
  Cate,
  CateEdit
} from '../containers';
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
        <Route path="scml/list(/:page)" component={Scml} />
        <Route path="scml/add" component={ScmlEdit} />
        <Route path="scml/view/:id" component={ScmlView} />
        <Route path="scml/edit/:id" component={ScmlEdit} />
        <Route path="mcml/list(/:page)" component={Mcml} />
        <Route path="mcml/add" component={McmlEdit} />
        <Route path="mcml/view/:id" component={McmlView} />
        <Route path="mcml/edit/:id" component={McmlEdit} />
        <Route path="cate/list(/:page)" component={Cate} />
        <Route path="cate/add" component={CateEdit} />
        <Route path="cate/edit/:id" component={CateEdit} />
      </Route>
      <Route path="login" component={Login} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
}
