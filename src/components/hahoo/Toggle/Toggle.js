import React from 'react';
import Tap from '../Tap';
import styles from './Toggle.css';

class Toggle extends React.Component {
  static propTypes = {
    className: React.PropTypes.string
  };

  state = {}

  render() {
    const { className, ...rest } = this.props;
    return (
      <Tap
        component="input"
        className={`${styles.toggle}${className ? ` ${className}` : ''}`}
        type="checkbox"
        {...rest}
      />
		);
  }
}

export default Toggle;
