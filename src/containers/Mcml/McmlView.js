import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import config from './config';
import {
  Navbar,
  PageWrapper,
  PageHeader,
  Detail,
  DetailTitle,
  DetailContent,
  LabelPublish,
  LabelUnPublish,
  BtnBack,
  BtnEdit,
  BtnDel,
  Toast,
  Dialog,
  ShowError
} from '../../components';
import { LinkContainer } from 'react-router-bootstrap';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { filterId } from '../../utils/filter';
import { getDetails, del, cleanError, cleanLoading } from '../../actions/mcml';

class McmlView extends React.Component {
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
    this.handleDel = this.handleDel.bind(this);
    this.handleDelConfirm = this.handleDelConfirm.bind(this);
  }

  state = {
    isEnterLoading: false,
    isDeling: false,
    del: {
      isShowDialog: false,
      id: undefined,
    },
  }

  componentWillMount() {
    const { data, dispatch } = this.props;
    const id = filterId(this.props.params.id);
    if (id === -1) {
      this.context.router.replace('/notfound');
    } else {
      if (!data.details || parseInt(data.details.id, 10) !== id ||
        ((Date.now() - data.details.receivedAt) > config.detailsRefreshTime)) {
        dispatch(getDetails(config.api.resource, id));
        this.setState({ isEnterLoading: true });
      }
    }

    if (data.error) {
      dispatch(cleanError());
    }
    if (data.isLoading || data.isUpdating) {
      dispatch(cleanLoading());
    }
  }

  componentDidMount() {
    if (this.props.data.details && !this.state.isEnterLoading) {
      window.scrollTo(0, 0);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if (!nextProps.data.shouldUpdate && data.shouldUpdate && this.state.isDeling) {
      if (data.page > 0) {
        this.context.router.replace(`/${config.module}/list/${data.page}`);
      } else {
        this.context.router.replace(`/${config.module}/list`);
      }
    }
    if (!nextProps.data.shouldUpdate && data.shouldUpdate && this.state.isEnterLoading) {
      window.scrollTo(0, 0);
      this.setState({ isEnterLoading: false });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.data.shouldUpdate) {
      return true;
    }
    if (nextState.del !== this.state.del ||
    nextState.isEnterLoading !== this.state.isEnterLoading) {
      return true;
    }
    return false;
  }

  handleDel(id) {
    this.setState({ del: { isShowDialog: true, id } });
  }

  handleDelConfirm(code) {
    if (code === 1) {
      this.props.dispatch(del(config.api.resource, this.state.del.id));
      this.setState({ del: { isShowDialog: false, id: undefined }, isDeling: true });
    } else {
      this.setState({ del: { isShowDialog: false, id: undefined } });
    }
  }

  render() {
    const { data, dispatch } = this.props;
    let loading = undefined;
    if (data.isLoading) {
      loading = <Toast type="loading" title="加载数据" isBlock />;
    }

    let error = undefined;
    if (!loading && data.error) {
      error = <ShowError
        error={data.error} key={Math.random()}
        onClose={() => dispatch(cleanError())}
      />;
    }

    let pageWrapper = undefined;
    let dialog = undefined;
    if (data.details && !this.state.isEnterLoading) {
      if (this.state.del.isShowDialog) {
        dialog = <Dialog title="确认" info="您确定删除吗？" type="confirm" onClick={this.handleDelConfirm} />;
      }
      pageWrapper = <div>
        <PageHeader title={config.moduleName} subTitle="详情">
          <ButtonToolbar>
            <BtnBack />
            <LinkContainer to={`/${config.module}/edit/${data.details.id}`}>
              <BtnEdit />
            </LinkContainer>
            <BtnDel onItemClick={this.handleDel} itemId={parseInt(data.details.id, 10)} />
          </ButtonToolbar>
        </PageHeader>

        <Detail>
          <DetailTitle>标题</DetailTitle>
          <DetailContent>{data.details.title}</DetailContent>
        </Detail>

        <Detail>
          <DetailTitle>分类</DetailTitle>
          <DetailContent>{data.details.cateName}</DetailContent>
        </Detail>

        <Detail>
          <DetailTitle>简介</DetailTitle>
          <DetailContent>{data.details.info}</DetailContent>
        </Detail>

        <Detail>
          <DetailTitle>更新时间</DetailTitle>
          <DetailContent>{data.details.updateTime}</DetailContent>
        </Detail>

        <Detail>
          <DetailTitle>排序编码</DetailTitle>
          <DetailContent>{data.details.orderId}</DetailContent>
        </Detail>

        <Detail>
          <DetailTitle>发布状态</DetailTitle>
          <DetailContent>
            {data.details.isPublish === 1 ? <LabelPublish /> : <LabelUnPublish />}
          </DetailContent>
        </Detail>

      </div>;
    }

    return (
      <div>
        <Helmet title={config.pageTitle} />
        <Navbar activeKey={config.module} />

        {dialog && dialog}
        {error && error}
        {loading && loading}
        <PageWrapper>
          {pageWrapper && pageWrapper}
        </PageWrapper>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const select = {
    data: state.mcml
  };
  return select;
};

export default connect(mapStateToProps)(McmlView);
