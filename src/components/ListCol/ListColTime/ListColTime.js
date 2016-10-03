import React from 'react';
import styles from './ListColTime.css';

class ListColTime extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  state = {}

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <div className={`${styles.publishtime}${className ? ` ${className}` : ''}`} {...rest}>
        {children}
      </div>
    );
  }
}

export default ListColTime;
