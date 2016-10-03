import React from 'react';
import styles from './ListColStatus.css';

class ListColStatus extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  state = {}

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <div className={`${styles.status}${className ? ` ${className}` : ''}`} {...rest}>
        {children}
      </div>
    );
  }
}

export default ListColStatus;
