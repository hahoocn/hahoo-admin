import React from 'react';
import Tap from '../hahoo/Tap';

class BtnCancel extends React.Component {
  static defaultProps = {
    title: '取消'
  }

  static propTypes = {
    title: React.PropTypes.string,
    className: React.PropTypes.string,
    onItemClick: React.PropTypes.func
  }

  render() {
    const { title, onItemClick, className, ...rest } = this.props;
    let style = 'btn btn-info btn-block';
    if (className) {
      style += ` ${className}`;
    }
    return (
      <Tap onTap={onItemClick} className={style} {...rest}>
        <i className="fa fa-times fa-fw" /> {title}
      </Tap>
		);
  }
}

export default BtnCancel;
