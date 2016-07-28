import React from 'react';
import styles from './DetailTitle.css';

class DetailTitle extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  state = {}

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <div className={`${styles.title}${className ? ` ${className}` : ''}`} {...rest}>
        {children}
      </div>
		);
  }
}

export default DetailTitle;
