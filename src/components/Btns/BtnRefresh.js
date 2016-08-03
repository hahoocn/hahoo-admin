import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Tap from '../hahoo/Tap';

class BtnRefresh extends React.Component {
  static defaultProps = {
    dropdown: false
  }

  static propTypes = {
    dropdown: React.PropTypes.bool,
    onItemClick: React.PropTypes.func
  }

  render() {
    const { dropdown, onItemClick, ...rest } = this.props;

    /* eslint no-else-return: 0 */
    if (dropdown) {
      return (<MenuItem {...rest}><i className="fa fa-refresh fa-fw" /> 刷新</MenuItem>);
    } else {
      return (<Tap
        onTap={onItemClick}
        className="btn btn-default"
        {...rest}
      ><i className="fa fa-refresh fa-fw" /> 刷新</Tap>);
    }
  }
}

export default BtnRefresh;
