import React from 'react';
import Helmet from 'react-helmet';
import config from '../../config';
import {
  Navbar,
  PageWrapper,
  PageHeader,
} from '../../components';

class Home extends React.Component {
  state = {}

  render() {
    // const styles = require('./Home.css');
    return (
      <div>
        <Helmet title={config.app.title} />
        <Navbar />

        <PageWrapper>
          <PageHeader title="首页" />

        </PageWrapper>

      </div>
		);
  }
}

export default Home;
