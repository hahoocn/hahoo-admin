import React from 'react';
import styles from './Pagination.css';
import Pagination from 'react-bootstrap/lib/Pagination';
import Pager from 'react-bootstrap/lib/Pager';

class HahooPagination extends React.Component {
  static propTypes = {
    page: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    recordCount: React.PropTypes.number,
    pageSelect: React.PropTypes.func
  }

  static defaultProps = {
    pageSize: 10
  }

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.handlePre = this.handlePre.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.page !== this.props.page ||
    nextProps.pageSize !== this.props.pageSize ||
    nextProps.recordCount !== this.props.recordCount;
  }

  handleSelect(eventKey) {
    if (eventKey !== this.props.page) {
      this.props.pageSelect(eventKey);
    }
  }

  handlePre() {
    const { page } = this.props;
    if (page > 1) {
      this.props.pageSelect(page - 1);
    }
  }

  handleNext() {
    const { page, pageSize, recordCount } = this.props;
    const pageCount = Math.ceil(recordCount / pageSize);
    if (page < pageCount) {
      this.props.pageSelect(page + 1);
    }
  }

  render() {
    const { page, pageSize, recordCount, ...rest } = this.props;
    delete rest.pageSelect;

    const pageCount = Math.ceil(recordCount / pageSize);
    const recordFrom = (page - 1) * pageSize + 1;
    let recordTo = page * pageSize;
    if (recordTo > recordCount) {
      recordTo = recordCount;
    }
    return (
      <div className="row">
        <div className={`col-sm-3 ${styles.pageinfo}`}>
          {recordFrom} - {recordTo} 共{recordCount}条信息
        </div>
        <div className={`col-sm-4 ${styles.pager}`}>
          <Pager>
            <Pager.Item disabled={page === 1} onSelect={this.handlePre}>&larr; 上一页</Pager.Item>
            {' '}
            <Pager.Item
              disabled={page === pageCount}
              onSelect={this.handleNext}
            >下一页 &rarr;</Pager.Item>
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
