import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Tap from '../hahoo/Tap';

class BtnDel extends React.Component {
  static defaultProps = {
    dropdown: false
  }

  static propTypes = {
    dropdown: React.PropTypes.bool,
    onItemClick: React.PropTypes.func,
    itemId: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.onItemClick) {
      this.props.onItemClick(this.props.itemId);
    }
  }

  render() {
    const { dropdown, ...rest } = this.props;
    delete rest.onItemClick;
    delete rest.itemId;

    /* eslint no-else-return: 0 */
    if (dropdown) {
      return (<MenuItem onClick={this.handleClick} {...rest}>
        <i className="fa fa-trash fa-fw" /> 删除</MenuItem>);
    } else {
      return (<Tap
        onTap={this.handleClick}
        className="btn btn-default"
        {...rest}
      ><i className="fa fa-trash fa-fw" /> 删除</Tap>);
    }
  }
}

export default BtnDel;
