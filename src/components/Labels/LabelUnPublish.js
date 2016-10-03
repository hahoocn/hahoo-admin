import React from 'react';
import styles from './Label.css';

class LabelUnPublish extends React.Component {
  state = {}
  render() {
    return (
      <span className={`${styles.btn} ${styles.unpublish}`}>未发布</span>
    );
  }
}

export default LabelUnPublish;
