import React from 'react';
import styles from './ListColOrder.css';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';

class ListColOrder extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    orderId: React.PropTypes.number.isRequired
  }

  state = {}

  render() {
    const { className, orderId, ...rest } = this.props;
    return (
      <div className={`hidden-xs ${styles.order}${className ? ` ${className}` : ''}`} {...rest}>
        <span className="fa fa-chevron-up fa-fw" />
        <span className="fa fa-chevron-down fa-fw" />
        <FormGroup bsSize="small" className={styles.orderNum}>
          <FormControl type="text" placeholder={orderId} />
        </FormGroup>
      </div>
		);
  }
}

export default ListColOrder;
