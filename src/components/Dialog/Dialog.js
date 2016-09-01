import React from 'react';
import styles from './Dialog.css';
import Dialog from '../hahoo/Dialog/Dialog';

class MainDialog extends React.Component {
  static defaultProps = {
    type: undefined
  }

  static propTypes = {
    type: React.PropTypes.string
  }

  render() {
    const { type } = this.props;
    return (
      <Dialog okBtnClass={type === 'confirm' ? styles.dialog : null} {...this.props} />
		);
  }
}

export default MainDialog;
