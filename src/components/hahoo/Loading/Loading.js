import React from 'react';
import styles from './Loading.css';

class Loading extends React.Component {
  state = {}

  render() {
    return (
      <div {...this.props}>
        <div className={`${styles.loading} ${styles.loading0}`} />
        <div className={`${styles.loading} ${styles.loading1}`} />
        <div className={`${styles.loading} ${styles.loading2}`} />
        <div className={`${styles.loading} ${styles.loading3}`} />
        <div className={`${styles.loading} ${styles.loading4}`} />
        <div className={`${styles.loading} ${styles.loading5}`} />
        <div className={`${styles.loading} ${styles.loading6}`} />
        <div className={`${styles.loading} ${styles.loading7}`} />
        <div className={`${styles.loading} ${styles.loading8}`} />
        <div className={`${styles.loading} ${styles.loading9}`} />
        <div className={`${styles.loading} ${styles.loading10}`} />
        <div className={`${styles.loading} ${styles.loading11}`} />
      </div>
    );
  }
}

export default Loading;
