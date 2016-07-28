import React from 'react';
import styles from './DetailContent.css';

class DetailContent extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  state = {}

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <div className={`${styles.info}${className ? ` ${className}` : ''}`} {...rest}>
        {children}
      </div>
		);
  }
}

export default DetailContent;
