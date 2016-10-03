import React from 'react';
import Tap from '../Tap';
import styles from './Mask.css';

class Mask extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    className: React.PropTypes.string
  };

  state = {}

  render() {
    const { className, onClick, ...rest } = this.props;
    let content;
    if (onClick) {
      content = (<Tap
        component="div"
        className={`${styles.mask}${className ? ` ${className}` : ''}`}
        onTap={onClick}
        {...rest}
      />);
    } else {
      content = (<div
        className={`${styles.mask}${className ? ` ${className}` : ''}`}
        {...rest}
      />);
    }

    return content;
  }
}

export default Mask;
