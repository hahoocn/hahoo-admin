import React from 'react';
import styles from './FormSubmitBtn.css';
import FormGroup from 'react-bootstrap/lib/FormGroup';

class FormSubmitBtn extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  state = {}

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <FormGroup className={`${styles.btngroup}${className ? ` ${className}` : ''}`} {...rest}>
        {children}
      </FormGroup>
		);
  }
}

export default FormSubmitBtn;
