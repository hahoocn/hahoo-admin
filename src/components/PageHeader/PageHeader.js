import React from 'react';
import styles from './PageHeader.css';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class PageHeader extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    title: React.PropTypes.string,
    subTitle: React.PropTypes.string,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.subTitle !== this.props.subTitle;
  }

  render() {
    const { children, title, subTitle } = this.props;
    return (
      <Row>
        <Col sm={12} className={styles.header}>
          <h3 className="page-header">{title} <small>{subTitle}</small></h3>
          <div className={styles.headerbtn}>
            {children}
          </div>
        </Col>
      </Row>
		);
  }
}

export default PageHeader;
