import React from 'react';
import styles from './ListRow.css';

class ListRow extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  state = {}

  render() {
    return (
      <li className={styles.listrow}>
        <div className="row">
          {this.props.children}
        </div>
      </li>
    );
  }
}

export default ListRow;
