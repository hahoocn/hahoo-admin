import React from 'react';
import Mask from '../Mask/Mask';
import Tap from '../Tap';
import styles from './Dialog.css';

class Dialog extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    type: React.PropTypes.string,
    cancelText: React.PropTypes.string,
    okText: React.PropTypes.string,
    onClose: React.PropTypes.func,
    onClick: React.PropTypes.func,
    bgClass: React.PropTypes.string,
    className: React.PropTypes.string,
    titleClassName: React.PropTypes.string,
    infoClassName: React.PropTypes.string,
    btnClass: React.PropTypes.string,
    okBtnClass: React.PropTypes.string,
    cancelBtnClass: React.PropTypes.string,
    info: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ])
  }

  static defaultProps = {
    type: 'alert',
    cancelText: '取消',
    okText: '确定'
  }

  constructor(props) {
    super(props);
    this.handleOkClick = this.handleClick.bind(this, 1);
    this.handleCancelClick = this.handleClick.bind(this, 0);
  }

  state = {
    isClose: false
  }

  handleClose() {
    this.setState({ isClose: true });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  handleClick(code) {
    if (this.props.onClick) {
      this.props.onClick(code);
    }
    this.handleClose();
  }

  render() {
    const { title, info, type, cancelText, okText, bgClass, className } = this.props;
    const { titleClassName, infoClassName, okBtnClass, cancelBtnClass } = this.props;
    const { btnClass } = this.props;

    let dialogTitle = undefined;
    if (title) {
      dialogTitle = <div className={styles.dialogHd}>
        <strong
          className={`${styles.dialogTitle}${titleClassName ? ` ${titleClassName}` : ''}`}
        >
          {title}
        </strong>
      </div>;
    }

    const buttonOk = <Tap
      component="div"
      onTap={this.handleOkClick}
      className={okBtnClass || styles.dialogBtnPrimary}
    >{okText}</Tap>;

    let buttons = undefined;
    if (type === 'confirm') {
      const buttonCancel = <Tap
        component="div"
        onTap={this.handleCancelClick}
        className={cancelBtnClass || styles.dialogBtnDefault}
      >{cancelText}</Tap>;

      buttons = <div className={`${styles.dialogFt}${btnClass ? ` ${btnClass}` : ''}`}>
        {buttonCancel}
        {buttonOk}
      </div>;
    } else {
      buttons = <div className={styles.dialogFt}>{buttonOk}</div>;
    }

    const mainClass = (type === 'confirm') ? styles.dialogConfirm : '';

    let dialog = undefined;
    if (!this.state.isClose) {
      dialog = <div className={`${mainClass}${className ? ` ${className}` : ''}`}>
        <div className={styles.dialog}>
          <div className={styles.dialogHdBlank}></div>
					{dialogTitle && dialogTitle}
          <div
            className={`${styles.dialogBd}${infoClassName ? ` ${infoClassName}` : ''}`}
          >{info}</div>
					{buttons && buttons}
        </div>
        <Mask className={bgClass} />
      </div>;
    }

    return (
      <div>
				{dialog && dialog}
      </div>
    );
  }
}

export default Dialog;
