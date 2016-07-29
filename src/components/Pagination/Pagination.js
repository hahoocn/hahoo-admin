import React from 'react';
import styles from './Pagination.css';
import Pagination from 'react-bootstrap/lib/Pagination';
import Pager from 'react-bootstrap/lib/Pager';

class HahooPagination extends React.Component {
  static propTypes = {
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    pageCount: React.PropTypes.number,
    recordCount: React.PropTypes.number,
    pageSelect: React.PropTypes.func
  }

  static defaultProps = {
    pageSize: 20
  }

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  state = {}

  shouldComponentUpdate(nextProps) {
    return nextProps.page !== this.props.page ||
    nextProps.pageSize !== this.props.pageSize ||
    nextProps.pageCount !== this.props.pageCount ||
    nextProps.recordCount !== this.props.recordCount;
  }

  handleSelect(eventKey) {
    this.props.pageSelect(eventKey);
  }

  render() {
    const { page, pageSize, pageCount, recordCount, ...rest } = this.props;
    delete rest.pageSelect;

    const pageFrom = (page - 1) * pageSize + 1;
    let pageTo = page * pageSize;
    if (pageTo > recordCount) {
      pageTo = recordCount;
    }
    return (
      <div className="row">
        <div className={`col-sm-3 ${styles.pageinfo}`}>
          {pageFrom} - {pageTo} 共{recordCount}条信息
        </div>
        <div className={`col-sm-4 ${styles.pager}`}>
          <Pager>
            <Pager.Item href="#">&larr; 上一页</Pager.Item>
            {' '}
            <Pager.Item href="#">下一页 &rarr;</Pager.Item>
          </Pager>
        </div>
        <div className={`col-sm-5 ${styles.pagination}`}>
          <Pagination
            ellipsis
            boundaryLinks
            items={pageCount}
            maxButtons={3}
            activePage={page}
            onSelect={this.handleSelect}
            {...rest}
          />
        </div>
      </div>
		);
  }
}

export default HahooPagination;
