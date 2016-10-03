import React from 'react';
import Tappable from 'react-tappable';

class Tap extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  static defaultProps = {
    pressDelay: 0
  }

  render() {
    const { children, ...rest } = this.props;
    return (
      <Tappable {...rest}>{children}</Tappable>
    );
  }
}

export default Tap;
