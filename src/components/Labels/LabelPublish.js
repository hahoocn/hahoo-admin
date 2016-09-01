import React from 'react';
import styles from './Label.css';

class LabelPublish extends React.Component {
  state = {}
  render() {
    return (
      <span className={`${styles.btn} ${styles.publish}`}>已发布</span>
		);
  }
}

export default LabelPublish;
