import React from 'react';
import styles from './ListColCate.css';

class ListColCate extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  state = {}

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <div className={`${styles.cate}${className ? ` ${className}` : ''}`} {...rest}>
        {children}
      </div>
		);
  }
}

export default ListColCate;
