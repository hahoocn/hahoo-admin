import React from 'react';
import Tap from '../hahoo/Tap';
import styles from './Btn.css';

class BtnSubmit extends React.Component {
  static defaultProps = {
    title: '提交'
  }

  static propTypes = {
    title: React.PropTypes.string,
    className: React.PropTypes.string,
    onItemClick: React.PropTypes.func
  }

  state = {}

  render() {
    const { title, onItemClick, className, ...rest } = this.props;
    let style = `btn btn-primary btn-block ${styles.mainBtn}`;
    if (className) {
      style += ` ${className}`;
    }
    return (
      <Tap onTap={onItemClick} className={style} {...rest}>
        <i className="fa fa-check fa-fw" /> {title}
      </Tap>
    );
  }
}

export default BtnSubmit;
