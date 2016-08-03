import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class BtnMoveId extends React.Component {
  static propTypes = {
    orderId: React.PropTypes.number,
    onItemClick: React.PropTypes.func,
    itemId: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onItemClick, itemId, orderId } = this.props;
    onItemClick(itemId, orderId);
  }

  render() {
    const { orderId, ...rest } = this.props;
    delete rest.onItemClick;
    delete rest.itemId;

    return (<MenuItem onClick={this.handleClick} {...rest}>
      <i className="fa fa-th-list fa-fw" /> 排序码{orderId}</MenuItem>);
  }
}

export default BtnMoveId;
