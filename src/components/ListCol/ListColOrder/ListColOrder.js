import React from 'react';
import styles from './ListColOrder.css';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Tap from '../../hahoo/Tap';
import toFloat from 'validator/lib/toFloat';
import isDecimal from 'validator/lib/isDecimal';

class ListColOrder extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    orderId: React.PropTypes.number.isRequired,
    itemId: React.PropTypes.number,
    onUpClick: React.PropTypes.func,
    onDownClick: React.PropTypes.func,
    onChangeOrderId: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.upClick = this.upClick.bind(this);
    this.downClick = this.downClick.bind(this);
    this.orderIdChange = this.orderIdChange.bind(this);
    this.onOrderIdChange = this.onOrderIdChange.bind(this);
    this.orderIdKeyPress = this.orderIdKeyPress.bind(this);
  }

  state = {
    orderId: 0
  }

  onOrderIdChange() {
    if (isDecimal(`${this.state.orderId}`)) {
      const newOrderId = toFloat(`${this.state.orderId}`);
      if (newOrderId && newOrderId > 0 && newOrderId !== toFloat(`${this.props.orderId}`)) {
        this.props.onChangeOrderId(this.props.itemId, newOrderId);
      }
    }
  }

  upClick() {
    this.props.onUpClick(this.props.itemId);
  }

  downClick() {
    this.props.onDownClick(this.props.itemId);
  }

  orderIdChange(e) {
    this.setState({ orderId: e.target.value });
  }

  orderIdKeyPress(e) {
    if (e.key === 'Enter') {
      this.onOrderIdChange();
    }
  }

  render() {
    const { className, orderId, ...rest } = this.props;
    delete rest.itemId;
    delete rest.onUpClick;
    delete rest.onDownClick;
    delete rest.onChangeOrderId;

    return (
      <div className={`hidden-xs ${styles.order}${className ? ` ${className}` : ''}`} {...rest}>
        <Tap
          className={`fa fa-chevron-up fa-fw ${styles.pointer}`}
          onTap={this.upClick}
        />
        <Tap
          className={`fa fa-chevron-down fa-fw ${styles.pointer}`}
          onTap={this.downClick}
        />
        <FormGroup bsSize="small" className={styles.orderNum}>
          <FormControl
            type="text"
            onChange={this.orderIdChange}
            placeholder={orderId}
            onKeyPress={this.orderIdKeyPress}
          />
        </FormGroup>
      </div>
		);
  }
}

export default ListColOrder;
