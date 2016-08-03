import React from 'react';
import styles from './Label.css';
import Tap from '../hahoo/Tap';

class LabelPublish extends React.Component {
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
        className={`label label-primary ${styles.btn}`}
        onTap={this.handleClick}
      >已发布</Tap>
		);
  }
}

export default LabelPublish;
