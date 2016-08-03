import React from 'react';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Button from 'react-bootstrap/lib/Button';

class BtnView extends React.Component {
  static defaultProps = {
    dropdown: false
  }

  static propTypes = {
    dropdown: React.PropTypes.bool
  }

  render() {
    const { dropdown, ...rest } = this.props;

    /* eslint no-else-return: 0 */
    if (dropdown) {
      return <MenuItem {...rest}><i className="fa fa-arrow-right fa-fw" /> 查看</MenuItem>;
    } else {
      return <Button {...rest}><i className="fa fa-arrow-right fa-fw" /> 查看</Button>;
    }
  }
}

export default BtnView;
