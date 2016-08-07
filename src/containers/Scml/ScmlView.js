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
  Dialog
} from '../../components';
import { LinkContainer } from 'react-router-bootstrap';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { filterId } from '../../utils/filter';
import { getDetails, delItem } from '../../actions/scml';

class ScmlView extends React.Component {
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
    showDelDialog: false,
    delId: undefined
  }

  componentWillMount() {
    const id = filterId(this.props.params.id);
    if (id === -1) {
      this.context.router.push('/notfound');
    } else {
      const { data } = this.props;
      if (!data.details || parseInt(data.details.id, 10) !== id ||
        ((Date.now() - data.details.receivedAt) > 2 * 60 * 1000)) {
        this.props.dispatch(getDetails(id));
        this.setState({ isEnterLoading: true });
      }
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
        this.context.router.replace(`/scml/list/${data.page}`);
      } else {
        this.context.router.replace('/scml/list');
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
    if (nextState.showDelDialog !== this.state.showDelDialog ||
    nextState.isEnterLoading !== this.state.isEnterLoading) {
      return true;
    }
    return false;
  }

  handleDel(id) {
    this.setState({ showDelDialog: true, delId: id });
  }

  handleDelConfirm(code) {
    if (code === 1) {
      this.props.dispatch(delItem(this.state.delId));
      this.setState({ showDelDialog: false, delId: undefined, isDeling: true });
    } else {
      this.setState({ showDelDialog: false, delId: undefined });
    }
  }

  render() {
    const { data } = this.props;
    let loading = undefined;
    if (data.asyncStatus && data.asyncStatus.details && data.asyncStatus.details.isFetching) {
      loading = <Toast type="loading" title="加载数据" isBlock />;
    }

    let pageWrapper = undefined;
    if (data.details && !this.state.isEnterLoading) {
      pageWrapper = <div>
        <PageHeader title={config.moduleName} subTitle="详情">
          <ButtonToolbar>
            <BtnBack />
            <LinkContainer to={`/scml/edit/${data.details.id}`}>
              <BtnEdit />
            </LinkContainer>
            <BtnDel onItemClick={this.handleDel} itemId={parseInt(data.details.id, 10)} />
          </ButtonToolbar>
        </PageHeader>

        <Detail>
          <Col componentClass={DetailTitle} sm={2}>
            标题
          </Col>
          <Col componentClass={DetailContent} sm={8}>
            {data.details.title}
          </Col>
        </Detail>

        <Detail>
          <Col componentClass={DetailTitle} sm={2}>
            简介
          </Col>
          <Col componentClass={DetailContent} sm={8}>
            {data.details.info}
          </Col>
        </Detail>

        <Detail>
          <Col componentClass={DetailTitle} sm={2}>
            更新时间
          </Col>
          <Col componentClass={DetailContent} sm={8}>
            {data.details.updateTime}
          </Col>
        </Detail>

        <Detail>
          <Col componentClass={DetailTitle} sm={2}>
            排序Id
          </Col>
          <Col componentClass={DetailContent} sm={8}>
            {data.details.orderId}
          </Col>
        </Detail>

        <Detail>
          <Col componentClass={DetailTitle} sm={2}>
            发布状态
          </Col>
          <Col componentClass={DetailContent} sm={8}>
            {data.details.isPublish === 1 ? <LabelPublish /> : <LabelUnPublish />}
          </Col>
        </Detail>

      </div>;
    }

    return (
      <div>
        <Helmet title={config.pageTitle} />
        <Navbar activeKey="scml" />

        {this.state.showDelDialog ?
          <Dialog
            title="确认"
            info="您确定删除吗？"
            type="confirm"
            onClick={this.handleDelConfirm}
          /> : ''}

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
    data: state.scml
  };
  return select;
};

export default connect(mapStateToProps)(ScmlView);
