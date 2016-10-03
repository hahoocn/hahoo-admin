import React from 'react';
import styles from './ListColText.css';

class ListColText extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  state = {}

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <div className={`${styles.text}${className ? ` ${className}` : ''}`} {...rest}>
        {children}
      </div>
    );
  }
}

export default ListColText;
