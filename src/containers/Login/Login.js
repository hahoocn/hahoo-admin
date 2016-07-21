import React from 'react';
import Helmet from 'react-helmet';
import config from '../../config';

class Login extends React.Component {
  state = {}

  render() {
    const pageTitle = `Login - ${config.app.title}`;
    return (
      <div className="container">
        <Helmet title={pageTitle} />
        <h1>Login</h1>
      </div>
		);
  }
}

export default Login;
