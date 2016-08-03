import React from 'react';
import styles from './Label.css';
import Tap from '../hahoo/Tap';

class LabelUnPublish extends React.Component {
  static propTypes = {
    onTap: React.PropTypes.func,
    itemId: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.itemId !== this.props.itemId;
  }

  handleClick() {
    if (this.props.onTap) {
      this.props.onTap(this.props.itemId);
    }
  }

  render() {
    return (
      <Tap
        className={`label label-info ${styles.btn}`}
        onTap={this.handleClick}
      >未发布</Tap>
		);
  }
}

export default LabelUnPublish;
