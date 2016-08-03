import React from 'react';
import Button from 'react-bootstrap/lib/Button';

class BtnCancel extends React.Component {
  static defaultProps = {
    bsStyle: 'info',
    block: true,
    title: '取消'
  }

  static propTypes = {
    title: React.PropTypes.string
  }

  render() {
    const { title, ...rest } = this.props;
    return (
      <Button {...rest}>
        <i className="fa fa-times fa-fw" /> {title}
      </Button>
		);
  }
}

export default BtnCancel;
