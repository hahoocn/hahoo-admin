import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import styles from './Detail.css';

class Detail extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  state = {}

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <Row className={`${styles.detail}${className ? ` ${className}` : ''}`} {...rest}>
        {children}
      </Row>
    );
  }
}

export default Detail;
