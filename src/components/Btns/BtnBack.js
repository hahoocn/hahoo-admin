import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Tap from '../hahoo/Tap';

class BtnBack extends React.Component {
  static defaultProps = {
    dropdown: false
  }

  static propTypes = {
    dropdown: React.PropTypes.bool
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.context.router.goBack();
  }

  render() {
    const { dropdown, ...rest } = this.props;

    /* eslint no-else-return: 0 */
    if (dropdown) {
      return (<MenuItem onClick={this.handleClick} {...rest}>
        <i className="fa fa-chevron-left fa-fw" /> 返回</MenuItem>);
    } else {
      return (<Tap
        onTap={this.handleClick}
        className="btn btn-default"
        {...rest}
      ><i className="fa fa-chevron-left fa-fw" /> 返回</Tap>);
    }
  }
}

export default BtnBack;
