import React from 'react';
import styles from './FormToggle.css';
import Toggle from '../../hahoo/Toggle/Toggle';

class FormToggle extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    label: React.PropTypes.string
  }

  state = {}

  render() {
    const { className, label, ...rest } = this.props;
    return (
      <div className={`${className ? `${className}` : ''}`}>
        <Toggle className={styles.toggle} {...rest} />
        <div className={styles.label}>{label}</div>
        <div className="clearfix"></div>
      </div>
		);
  }
}

export default FormToggle;
