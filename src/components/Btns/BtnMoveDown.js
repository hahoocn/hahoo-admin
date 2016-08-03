import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class BtnMoveDown extends React.Component {
  static propTypes = {
    onItemClick: React.PropTypes.func,
    itemId: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onItemClick(this.props.itemId);
  }

  render() {
    const { ...rest } = this.props;
    delete rest.onItemClick;
    delete rest.itemId;

    return (<MenuItem onClick={this.handleClick} {...rest}>
      <i className="fa fa-chevron-down fa-fw" /> 下移</MenuItem>);
  }
}

export default BtnMoveDown;
