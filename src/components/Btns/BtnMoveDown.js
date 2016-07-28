import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';

class BtnMoveDown extends React.Component {
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

    /* eslint no-else-return: 0 */
    if (dropdown) {
      return <MenuItem onClick={this.handleClick} {...rest}>
        <i className="fa fa-chevron-down fa-fw" /> 下移</MenuItem>;
    } else {
      return <Button onClick={this.handleClick} {...rest}>
        <i className="fa fa-chevron-down fa-fw" /> 下移</Button>;
    }
  }
}

export default BtnMoveDown;
