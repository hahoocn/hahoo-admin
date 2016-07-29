import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';

class BtnUnPub extends React.Component {
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

  state = {}

  handleClick() {
    this.props.onItemClick(this.props.itemId);
  }

  render() {
    const { dropdown, ...rest } = this.props;
    delete rest.onItemClick;
    delete rest.itemId;

    /* eslint no-else-return: 0 */
    if (dropdown) {
      return <MenuItem onClick={this.handleClick} {...rest}>
        <i className="fa fa-times fa-fw" /> 停止发布</MenuItem>;
    } else {
      return <Button onClick={this.handleClick} {...rest}>
        <i className="fa fa-times fa-fw" /> 停止发布</Button>;
    }
  }
}

export default BtnUnPub;
