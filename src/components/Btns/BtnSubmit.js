import React from 'react';
import Button from 'react-bootstrap/lib/Button';

class BtnSubmit extends React.Component {
  static defaultProps = {
    type: 'submit',
    bsStyle: 'primary',
    block: true,
    title: '提交'
  }

  static propTypes = {
    title: React.PropTypes.string
  }

  state = {}

  render() {
    const { title, ...rest } = this.props;
    return (
      <Button {...rest}>
        <i className="fa fa-check fa-fw" /> {title}
      </Button>
		);
  }
}

export default BtnSubmit;
