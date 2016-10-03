import React from 'react';
import Helmet from 'react-helmet';
import Panel from 'react-bootstrap/lib/Panel';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import config from '../../config';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.setLoginID = this.setLoginID.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  state = {
    isLoading: false,
    username: '',
    password: ''
  }

  setLoginID(e) {
    this.setState({ username: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  handleLogin() {
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }

  render() {
    const styles = require('./Login.css');

    const pageTitle = `Login - ${config.app.title}`;
    const isLoading = this.state.isLoading;
    return (
      <div>
        <Helmet title={pageTitle} />

        <div className="col-md-4 col-md-offset-4">

          <div className={styles.lgoinTitle}>
            <h1>Hahoo Admin</h1>
          </div>

          <Panel header={<h3>请登录</h3>} className={styles.loginPanel}>

            <form role="form" onSubmit={!isLoading ? this.handleLogin : null}>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="用户名"
                  value={this.state.username}
                  onChange={this.setLoginID}
                />
              </FormGroup>

              <FormGroup>
                <FormControl
                  type="password"
                  placeholder="密码"
                  value={this.state.password}
                  onChange={this.setPassword}
                />
              </FormGroup>

              <Button
                type="submit"
                bsSize="large"
                bsStyle="info"
                block
                disabled={isLoading}
                onClick={!isLoading ? this.handleLogin : null}
              >
                {isLoading ? '正在登录...' : '登录'}
              </Button>
            </form>

          </Panel>

        </div>

      </div>
    );
  }
}

export default Login;
