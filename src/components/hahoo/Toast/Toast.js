import React from 'react';
import styles from './Toast.css';
import Loading from '../Loading/Loading';

import dhIcon from '../../../assets/icons/hahoo-ui/dui.svg';
import warnIcon from '../../../assets/icons/hahoo-ui/warn.svg';
import wrongIcon from '../../../assets/icons/hahoo-ui/wrong.svg';

class Toast extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    type: React.PropTypes.string,
    isAutoClose: React.PropTypes.bool,
    isBlock: React.PropTypes.bool,
    onClose: React.PropTypes.func,
    closeSpeed: React.PropTypes.number
  };

  static defaultProps = {
    type: 'success',
    isBlock: false,
    isAutoClose: true,
    closeSpeed: 1000
  };

  state = {
    isClose: false,
  };

  componentDidMount() {
    if (this.props.type !== 'loading' && this.props.isAutoClose) {
      this.closeTimeout = setTimeout(this.handleClose.bind(this), this.props.closeSpeed);
    }
  }

  componentWillUnmount() {
    if (this.props.isAutoClose && !this.state.isClose && this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = false;
    }
  }

  handleClose() {
    this.setState({ isClose: true });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  render() {
    let icon;
    switch (this.props.type) {
      case 'success':
        icon = dhIcon;
        break;
      case 'warn':
        icon = warnIcon;
        break;
      case 'wrong':
        icon = wrongIcon;
        break;
      case 'loading':
        icon = <Loading className={styles.toastLoading} />;
        break;
      default:
        icon = dhIcon;
        break;
    }

    let iconbox;
    if (this.props.type === 'loading') {
      iconbox = icon;
    } else {
      iconbox = (<div className={styles.iconToast}>
        <img src={icon} role="presentation" />
      </div>);
    }

    let toast;
    if (!this.state.isClose) {
      toast = (<div>
        {this.props.isBlock ? <div className={styles.mask} /> : null}
        <div className={styles.toast}>
          {iconbox}
          <div className={styles.title}>{this.props.title}</div>
        </div>
      </div>);
    }

    return (
      <div>
        {toast && toast}
      </div>
    );
  }
}

export default Toast;
