import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import FormControl from 'react-bootstrap/lib/FormControl';
import toFloat from 'validator/lib/toFloat';
import isDecimal from 'validator/lib/isDecimal';

import config from './config';
import { filterPage, filterParentId } from '../../utils/filter';
import ListRow from './ListRow';

import {
  Navbar,
  PageWrapper,
  PageHeader,
  List,
  BtnAdd,
  BtnRefresh,
  Pagination,
  Dialog,
  Toast,
  ShowError,
  BtnUpLevel,
  BtnBack
} from '../../components';

import {
  getList,
  setListStatus,
  publish,
  del,
  order,
  getScrollPosition,
  cleanError,
  cleanLoading
} from '../../actions/cate';

class Cate extends React.Component {
  static propTypes = {
    data: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    params: React.PropTypes.object,
    location: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state.pageSize = config.pageSize;
    this.pageSelect = this.pageSelect.bind(this);
    this.handleDelConfirm = this.handleDelConfirm.bind(this);
    this.changeOrderIdConfirm = this.changeOrderIdConfirm.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  state = {
    pageSize: 10,
    isLoading: false,
    del: {
      isShowDialog: false,
      id: undefined,
    },
    order: {
      isShowDialog: false,
      id: undefined,
      orderId: undefined,
      newOrderId: undefined,
    }
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    const { data, dispatch } = this.props;
    if (data.error) {
      dispatch(cleanError());
    }
    if (data.isLoading || data.isUpdating) {
      dispatch(cleanLoading());
    }
  }

  componentDidMount() {
    const page = filterPage(this.props.params.page);
    const parentId = filterParentId(this.props.location.query.parentid);
    if (page === -1 || parentId === -1) {
      this.context.router.replace('/notfound');
    } else {
      const { data, dispatch } = this.props;
      if (page !== data.page || data.items.length === 0 || parentId !== data.parentId ||
        (data.listUpdateTime && ((Date.now() - data.listUpdateTime) > config.listRefreshTime))) {
        dispatch(setListStatus('initPage'));
        dispatch(getList(config.api.resource, page, this.state.pageSize, { parentId }));
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
    const parentId = filterParentId(nextProps.location.query.parentid);
    if (page === -1 || parentId === -1) {
      return false;
    }
    if (page !== data.page || data.items.length === 0 || parentId !== data.parentId ||
      (data.listUpdateTime && ((Date.now() - data.listUpdateTime) > config.listRefreshTime))) {
      return true;
    }
    if (data.shouldUpdate || nextProps.data.shouldUpdate) {
      return true;
    }
    if (nextState.del !== this.state.del ||
      nextState.order !== this.state.order ||
      nextState.isLoading !== this.state.isLoading) {
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, dispatch } = this.props;
    if (!data.isLoading && prevProps.data.isLoading && !data.error) {
      switch (data.listStatus) {
        case 'initPage':
          window.scrollTo(0, this.props.data.scrollY);
          break;
        case 'switchingPage':
          window.scrollTo(0, 0);
          this.context.router.push(`/${config.module}/list/${data.page}?parentid=${data.parentId}`);
          break;
        case 'order':
          break;
        default:
          window.scrollTo(0, 0);
      }
      dispatch(setListStatus('ok'));
    } else {
      // 直接从浏览器输入页码
      const page = filterPage(this.props.params.page);
      const parentId = filterParentId(this.props.location.query.parentid);
      if (page === -1 || parentId === -1) {
        this.context.router.replace('/notfound');
      } else if (!data.isLoading && (page !== data.page || parentId !== data.parentId) &&
        !data.error && data.listStatus === 'ok') {
        dispatch(getList(config.api.resource, page, this.state.pageSize, { parentId }));
      }

      if (prevState.isLoading && !this.state.isLoading) {
        window.scrollTo(0, this.props.data.scrollY);
      }
    }
  }

  componentWillUnmount() {
    this.props.dispatch(getScrollPosition(window.scrollY));
  }

  pageSelect(page) {
    const { dispatch } = this.props;
    const parentId = filterParentId(this.props.location.query.parentid);
    dispatch(setListStatus('switchingPage'));
    dispatch(getList(config.api.resource, page, this.state.pageSize, { parentId }));
  }

  refresh() {
    const { dispatch, data } = this.props;
    const parentId = filterParentId(this.props.location.query.parentid);
    dispatch(getList(config.api.resource, data.page, this.state.pageSize, { parentId }));
  }

  handleDelConfirm(code) {
    if (code === 1) {
      this.props.dispatch(del(config.api.resource, this.state.del.id));
    }
    this.setState({ del: { isShowDialog: false, id: undefined } });
  }

  changeOrderIdConfirm(code) {
    if (code === 1) {
      if (isDecimal(`${this.state.order.newOrderId}`)) {
        const newOrderId = toFloat(`${this.state.order.newOrderId}`);
        if (newOrderId && newOrderId > 0 && newOrderId !== toFloat(`${this.state.order.orderId}`)) {
          const { dispatch, params } = this.props;
          const parentId = filterParentId(this.props.location.query.parentid);
          dispatch(order(config.api.resource, this.state.order.id,
            'changeOrderId', params.page, this.state.pageSize, newOrderId, { parentId }));
        }
      }
    }
    this.setState({
      order: { isShowDialog: false, id: undefined, orderId: undefined, newOrderId: undefined }
    });
  }

  render() {
    const { data, dispatch, params, location } = this.props;
    const { page } = params;
    const { pageSize } = this.state;
    const parentId = filterParentId(location.query.parentid);

    let loading;
    if (data.isLoading || this.state.isLoading) {
      loading = <Toast type="loading" title="加载数据" isBlock />;
    }
    if (data.isUpdating) {
      loading = <Toast type="loading" title="正在更新" isBlock />;
    }

    let error;
    if (!loading && data.error) {
      error = <ShowError error={data.error} key={Math.random()} onClose={() => dispatch(cleanError())} />;
    }

    let pageWrapper;
    let dialog;
    if (!this.state.isLoading) {
      if (this.state.del.isShowDialog) {
        dialog = <Dialog title="确认" info="您确定删除吗？" type="confirm" onClick={this.handleDelConfirm} />;
      }
      if (this.state.order.isShowDialog) {
        dialog = (<Dialog
          title="修改排序码"
          info={<FormControl
            type="number"
            value={this.state.order.newOrderId}
            onChange={e => this.setState({
              order: Object.assign({}, this.state.order, { newOrderId: e.target.value })
            })}
          />}
          type="confirm"
          onClick={this.changeOrderIdConfirm}
        />);
      }

      let rows;
      let pagination;
      if (data.items && data.items.length > 0) {
        rows = data.items.map(item => (<ListRow
          module={config.module}
          key={item.id}
          item={item}
          location={location}
          onDelete={id => this.setState({ del: { isShowDialog: true, id } })}
          onPublish={id => dispatch(publish(config.api.resource, id, true))}
          onUnPublish={id => dispatch(publish(config.api.resource, id, false))}
          onMoveUp={id => dispatch(order(config.api.resource, id, 'up', page, pageSize, undefined, { parentId }))}
          onMoveDown={id => dispatch(order(config.api.resource, id, 'down', page, pageSize, undefined, { parentId }))}
          onMoveTo={(id, orderId) =>
            dispatch(order(config.api.resource, id, 'changeOrderId', page, pageSize, orderId, { parentId }))}
          onPopOrderIdPannel={(id, orderId) => this.setState({
            order: { isShowDialog: true, id, orderId, newOrderId: orderId }
          })}
        />));

        pagination = (<Pagination
          page={data.page}
          pageSize={pageSize}
          recordCount={data.totalCount}
          pageSelect={this.pageSelect}
        />);
      }

      pageWrapper = (<div>
        <PageHeader title={config.moduleName} subTitle={data.parentName ? `上级: ${data.parentName}` : ''}>
          <ButtonToolbar>
            {parentId > 0 ? <BtnBack /> : null}
            {parentId > 0 ?
              <BtnUpLevel
                onItemClick={() => this.context.router.push(`/${config.module}/list?parentid=${data.parentLinkId}`)}
              /> : null}
            <BtnAdd onItemClick={() => this.context.router.push(`/${config.module}/add`)} />
            <BtnRefresh onItemClick={this.refresh} />
          </ButtonToolbar>
        </PageHeader>

        <List>
          {rows && rows}
        </List>

        {pagination && pagination}
      </div>);
    }

    return (
      <div>
        <Helmet title={config.pageTitle} />
        <Navbar activeKey={config.module} />

        {dialog && dialog}
        {error && error}
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
    data: state.cate
  };
  return select;
};

export default connect(mapStateToProps)(Cate);
