import React from 'react';
import styles from './FormSubmitBtn.css';

class FormSubmitBtn extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  state = {}

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <div className={`${styles.btngroup}${className ? ` ${className}` : ''}`} {...rest}>
        {children}
      </div>
    );
  }
}

export default FormSubmitBtn;
