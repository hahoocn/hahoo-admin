import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';

class BtnEdit extends React.Component {
  static defaultProps = {
    dropdown: false
  }

  static propTypes = {
    dropdown: React.PropTypes.bool
  }

  state = {}

  render() {
    const { dropdown, ...rest } = this.props;

    /* eslint no-else-return: 0 */
    if (dropdown) {
      return <MenuItem {...rest}><i className="fa fa-pencil-square-o fa-fw" /> 修改</MenuItem>;
    } else {
      return <Button {...rest}><i className="fa fa-pencil-square-o fa-fw" /> 修改</Button>;
    }
  }
}

export default BtnEdit;
