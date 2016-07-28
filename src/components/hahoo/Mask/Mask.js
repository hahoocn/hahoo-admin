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

    /* eslint no-else-return: 0 */
    if (onClick) {
      return <Tap
        component="div"
        className={`${styles.mask}${className ? ` ${className}` : ''}`}
        onTap={onClick}
        {...rest}
      />;
    } else {
      return <div
        className={`${styles.mask}${className ? ` ${className}` : ''}`}
        {...rest}
      />;
    }
  }
}

export default Mask;
