import React from 'react';
import styles from './List.css';

class List extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  state = {}

  render() {
    return (
      <div className={styles.list}>
        <ul className={styles.listul}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

export default List;
