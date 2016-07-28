import React from 'react';
import styles from './Loading.css';

class Loading extends React.Component {
  state = {}

  render() {
    return (
      <div {...this.props}>
        <div className={`${styles.loading} ${styles.loading0}`}></div>
        <div className={`${styles.loading} ${styles.loading1}`}></div>
        <div className={`${styles.loading} ${styles.loading2}`}></div>
        <div className={`${styles.loading} ${styles.loading3}`}></div>
        <div className={`${styles.loading} ${styles.loading4}`}></div>
        <div className={`${styles.loading} ${styles.loading5}`}></div>
        <div className={`${styles.loading} ${styles.loading6}`}></div>
        <div className={`${styles.loading} ${styles.loading7}`}></div>
        <div className={`${styles.loading} ${styles.loading8}`}></div>
        <div className={`${styles.loading} ${styles.loading9}`}></div>
        <div className={`${styles.loading} ${styles.loading10}`}></div>
        <div className={`${styles.loading} ${styles.loading11}`}></div>
      </div>
		);
  }
}

export default Loading;
