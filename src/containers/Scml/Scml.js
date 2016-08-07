import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import config from './config';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import FormControl from 'react-bootstrap/lib/FormControl';
import { filterPage } from '../../utils/filter';
import ListRow from './ListRow';
import toFloat from 'validator/lib/toFloat';
import isDecimal from 'validator/lib/isDecimal';

import {
  Navbar,
  PageWrapper,
  PageHeader,
  List,
  BtnAdd,
  BtnRefresh,
  Pagination,
  Dialog,
  Toast
} from '../../components';

import {
  getList,
  setListStatus,
  switchFlag,
  delItem,
  order,
  getScrollPosition
} from '../../actions/scml';

class Scml extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.pageSelect = this.pageSelect.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleDelConfirm = this.handleDelConfirm.bind(this);
    this.handlePub = this.handlePub.bind(this);
    this.handleUnPub = this.handleUnPub.bind(this);
    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.handleMoveDown = this.handleMoveDown.bind(this);
    this.handleMoveId = this.handleMoveId.bind(this);
    this.handleMoveIdConfirm = this.handleMoveIdConfirm.bind(this);
    this.handleMoveTo = this.handleMoveTo.bind(this);
    this.orderIdChange = this.orderIdChange.bind(this);
  }

  state = {
    pageSize: 10,
    showDelDialog: false,
    showMoveIdDialog: false,
    delId: undefined,
    moveId: undefined,
    orderId: undefined,
    newOrderId: undefined,
    isLoading: false
  }

  componentWillMount() {
    this.setState({ isLoading: true });
  }

  componentDidMount() {
    const page = filterPage(this.props.params.page);
    if (page === -1) {
      this.context.router.push('/notfound');
    } else {
      const { data, dispatch } = this.props;
      if (page !== data.page || data.items.length === 0 ||
        (data.listUpdateTime && ((Date.now() - data.listUpdateTime) > 5 * 60 * 1000))) {
        dispatch(setListStatus('initPage'));
        dispatch(getList(page, this.state.pageSize));
      }
    }

    if (this.state.isLoading) {
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 50);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { data } = this.props;
    const page = filterPage(nextProps.params.page);
    if (page === -1) {
      return false;
    }
    if (page !== data.page || data.items.length === 0 ||
      (data.listUpdateTime && ((Date.now() - data.listUpdateTime) > 5 * 60 * 1000))) {
      return true;
    }
    if (data.shouldUpdate || nextProps.data.shouldUpdate) {
      return true;
    }
    if (nextState.showDelDialog !== this.state.showDelDialog ||
      nextState.showMoveIdDialog !== this.state.showMoveIdDialog ||
      nextState.newOrderId !== this.state.newOrderId ||
      nextState.isLoading !== this.state.isLoading) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, dispatch } = this.props;
    if ((data.asyncStatus && data.asyncStatus.list && !data.asyncStatus.list.isFetching) &&
    (prevProps.data.asyncStatus && prevProps.data.asyncStatus.list &&
      prevProps.data.asyncStatus.list.isFetching)) {
      switch (data.listStatus) {
        case 'initPage':
          window.scrollTo(0, this.props.data.scrollY);
          break;
        case 'switchingPage':
          window.scrollTo(0, 0);
          this.context.router.push(`/scml/list/${data.page}`);
          break;
        default:
      }
      dispatch(setListStatus('ok'));
    } else {
      // 直接从浏览器输入页码
      const page = filterPage(this.props.params.page);
      if (page === -1) {
        this.context.router.push('/notfound');
      } else {
        if (!(data.asyncStatus && data.asyncStatus.list && data.asyncStatus.list.isFetching) &&
        page !== data.page) {
          dispatch(getList(page, this.state.pageSize));
        }
      }

      if (prevState.isLoading && !this.state.isLoading) {
        window.scrollTo(0, this.props.data.scrollY);
      }
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(getScrollPosition(window.scrollY));
  }

  pageSelect(page) {
    const { dispatch } = this.props;
    dispatch(setListStatus('switchingPage'));
    dispatch(getList(page, this.state.pageSize));
  }

  handleRefresh() {
    const { dispatch, params } = this.props;
    dispatch(getList(params.page, this.state.pageSize));
  }

  handleDel(id) {
    this.setState({ showDelDialog: true, delId: id });
  }

  handleDelConfirm(code) {
    if (code === 1) {
      this.props.dispatch(delItem(this.state.delId));
    }
    this.setState({ showDelDialog: false, delId: undefined });
  }

  handlePub(id) {
    this.props.dispatch(switchFlag(id, 'isPublish', 1));
  }

  handleUnPub(id) {
    this.props.dispatch(switchFlag(id, 'isPublish', 0));
  }

  handleMoveUp(id) {
    const { dispatch, params } = this.props;
    dispatch(order(id, 'up', params.page, this.state.pageSize));
  }

  handleMoveDown(id) {
    const { dispatch, params } = this.props;
    dispatch(order(id, 'down', params.page, this.state.pageSize));
  }

  handleMoveId(id, orderId) {
    this.setState({ showMoveIdDialog: true, moveId: id, orderId, newOrderId: orderId });
  }

  orderIdChange(e) {
    this.setState({ newOrderId: e.target.value });
  }

  handleMoveIdConfirm(code) {
    if (code === 1) {
      if (isDecimal(`${this.state.newOrderId}`)) {
        const newOrderId = toFloat(`${this.state.newOrderId}`);
        if (newOrderId && newOrderId > 0 && newOrderId !== toFloat(`${this.state.orderId}`)) {
          const { dispatch, params } = this.props;
          const { moveId, pageSize } = this.state;
          dispatch(order(moveId, 'changeOrderId', params.page, pageSize, newOrderId));
        }
      }
    }
    this.setState({ showMoveIdDialog: false, moveId: undefined,
      orderId: undefined, newOrderId: undefined });
  }

  handleMoveTo(id, orderId) {
    const { dispatch, params } = this.props;
    dispatch(order(id, 'changeOrderId', params.page, this.state.pageSize, orderId));
  }

  render() {
    const { data } = this.props;

    let loading = undefined;
    if ((data.asyncStatus && data.asyncStatus.list && data.asyncStatus.list.isFetching) ||
    this.state.isLoading) {
      loading = <Toast type="loading" title="加载数据" isBlock />;
    }
    if (data.asyncStatus && data.asyncStatus.switchFlag && data.asyncStatus.switchFlag.isFetching ||
      data.asyncStatus && data.asyncStatus.delItem && data.asyncStatus.delItem.isFetching ||
      data.asyncStatus && data.asyncStatus.order && data.asyncStatus.order.isFetching) {
      loading = <Toast type="loading" title="正在更新" isBlock />;
    }

    let pageWrapper = undefined;
    if (!this.state.isLoading && data.items && data.items.length > 0) {
      const rows = data.items.map((item) => (<ListRow
        key={item.id}
        item={item}
        onDelete={this.handleDel}
        onPublish={this.handlePub}
        onUnPublish={this.handleUnPub}
        onMoveUp={this.handleMoveUp}
        onMoveDown={this.handleMoveDown}
        onMoveTo={this.handleMoveTo}
        onPopOrderIdPannel={this.handleMoveId}
      />));

      const pagination = <Pagination
        page={data.page}
        pageSize={this.state.pageSize}
        recordCount={data.totalCount}
        pageSelect={this.pageSelect}
      />;

      pageWrapper = <div>
        <PageHeader title={config.moduleName} subTitle="列表">
          <ButtonToolbar>
            <BtnAdd onItemClick={() => this.context.router.push('/scml/add')} />
            <BtnRefresh onItemClick={this.handleRefresh} />
          </ButtonToolbar>
        </PageHeader>

        <List>
        {rows && rows}
        </List>

        {pagination && pagination}
      </div>;
    }

    return (
      <div>
        <Helmet title={config.pageTitle} />
        <Navbar activeKey="scml" />

        {this.state.showDelDialog ?
          <Dialog title="确认" info="您确定删除吗？" type="confirm" onClick={this.handleDelConfirm} /> : ''}

        {this.state.showMoveIdDialog ?
          <Dialog
            title="修改排序码"
            info={<FormControl
              type="number"
              value={this.state.newOrderId}
              onChange={this.orderIdChange}
            />}
            type="confirm"
            onClick={this.handleMoveIdConfirm}
          /> : ''}

        {loading && loading}
        <PageWrapper>
          {pageWrapper}
        </PageWrapper>

      </div>
		);
  }
}

const mapStateToProps = (state) => {
  const select = {
    data: state.scml
  };
  return select;
};

export default connect(mapStateToProps)(Scml);
