import React from 'react';
import Helmet from 'react-helmet';
import config from '../../config';
import { TopNavbar } from '../../components';

class Home extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    home: React.PropTypes.object,
  };

  state = {}

  render() {
    // const styles = require('./Home.css');
    return (
      <div>
        <Helmet title={config.app.title} />
        <TopNavbar />

        <div className="container">
          <h1>Home</h1>
        </div>

      </div>
		);
  }
}

export default Home;
