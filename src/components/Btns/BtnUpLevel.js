import React from 'react';
import Tap from '../hahoo/Tap';

class BtnUpLevel extends React.Component {
  static propTypes = {
    onItemClick: React.PropTypes.func
  }

  state = {}

  render() {
    const { onItemClick, ...rest } = this.props;

    return (<Tap
      onTap={onItemClick}
      className="btn btn-default"
      {...rest}
    ><i className="fa fa-arrow-circle-up fa-fw" /> 上级</Tap>);
  }
}

export default BtnUpLevel;
