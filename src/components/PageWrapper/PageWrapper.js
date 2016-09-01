import React from 'react';
import styles from './PageWrapper.css';

class PageWrapper extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  }

  state = {}

  render() {
    return (
      <div className={styles.pagewrapper}>
        {this.props.children}
        <div className={styles.foot} />
      </div>
		);
  }
}

export default PageWrapper;
