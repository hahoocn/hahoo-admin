import React from 'react';

class ListCol extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  state = {}

  render() {
    const { children, ...rest } = this.props;
    return (
      <div {...rest}>
        {children}
      </div>
    );
  }
}

export default ListCol;
