import React from 'react';
import styles from './ToastAlert.css';

class ToastAlert extends React.Component {

  static propTypes = {
    info: React.PropTypes.string.isRequired,
    isAutoClose: React.PropTypes.bool,
    isBlock: React.PropTypes.bool,
    onClose: React.PropTypes.func,
    closeSpeed: React.PropTypes.number
  };

  static defaultProps = {
    isBlock: false,
    isAutoClose: true,
    closeSpeed: 1500
  };

  state = {
    isClose: false,
  };

  componentDidMount() {
    if (this.props.isAutoClose) {
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
    let toast;
    if (!this.state.isClose) {
      toast = (<div>
        {this.props.isBlock ? <div className={styles.mask} /> : null}
        <div className={styles.toast}>
          {this.props.info}
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

export default ToastAlert;
