import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Row from 'react-bootstrap/lib/Row';
import isFloat from 'validator/lib/isFloat';
import toFloat from 'validator/lib/toFloat';
import config from './config';
import {
  Navbar,
  PageWrapper,
  PageHeader,
  FormSubmitBtn,
  BtnCancel,
  BtnSubmit,
  FormToggle,
  Toast,
  ShowError,
  CateSelect
} from '../../components';

import { add, update, getEditDetails, cleanError, cleanLoading, setError, getCate } from '../../actions/mcml';
import { responseError } from '../../api/utils';

class McmlEdit extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
    dispatch: React.PropTypes.func,
    data: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  state = {
    id: 0,
    isSuccess: false,
    formTitle: '',
    formInfo: '',
    formIsPublish: true,
    formOrderId: 0,
    formCateId: ''
  }

  componentWillMount() {
    const { data, dispatch } = this.props;
    const id = parseInt(this.props.params.id, 10);
    if (id) {
      this.setState({ id });
    }
    if (data.error) {
      dispatch(cleanError());
    }
    if (data.isLoading || data.isUpdating) {
      dispatch(cleanLoading());
    }

    if (id > 0) {
      const { details, cates } = data;
      if (details && details.id === id && cates.length > 0) {
        this.setState({
          formTitle: details.title,
          formInfo: details.info,
          formIsPublish: details.isPublish === 1,
          formOrderId: details.orderId,
          formCateId: details.cateId
        });
      } else {
        dispatch(getEditDetails(config.api.resource, id, config.api.cateResource));
      }
    } else {
      dispatch(getCate(config.api.cateResource));
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if (data.isUpdating && !nextProps.data.isUpdating && !nextProps.data.error) {
      this.setState({ isSuccess: true });
    }
    if (data.isLoading && !nextProps.data.isLoading) {
      const { details } = nextProps.data;
      if (details && details.id === this.state.id) {
        this.setState({
          formTitle: details.title,
          formInfo: details.info,
          formIsPublish: details.isPublish === 1,
          formOrderId: details.orderId,
          formCateId: details.cateId
        });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { id, formTitle, formInfo, formIsPublish, formCateId } = this.state;
    if (formTitle.length === 0) {
      dispatch(setError(responseError('请输入标题')));
    } else if (formCateId.length === 0) {
      dispatch(setError(responseError('请选择分类')));
    } else if (this.state.id > 0) {
      if (this.state.formOrderId <= 0) {
        dispatch(setError(responseError('排序Id请输入大于0的数字')));
      } else if (!isFloat(`${this.state.formOrderId}`)) {
        dispatch(setError(responseError('排序Id请输入数字')));
      } else {
        const orderId = toFloat(`${this.state.formOrderId}`);
        dispatch(update(config.api.resource, id, {
          title: formTitle,
          info: formInfo,
          isPublish: formIsPublish,
          orderId,
          cateId: formCateId
        }));
      }
    } else {
      dispatch(add(config.api.resource, {
        title: formTitle,
        info: formInfo,
        isPublish: formIsPublish,
        cateId: formCateId
      }));
    }
  }

  handleSuccess() {
    if (this.state.id > 0) {
      this.context.router.goBack();
    } else {
      this.context.router.replace(`/${config.module}/list`);
    }
  }

  render() {
    const { router } = this.context;
    const { data, dispatch } = this.props;
    const id = this.state.id;
    let subTitle = '添加';
    if (id > 0) {
      subTitle = '修改';
    }

    let loading;
    if (data.isLoading) {
      loading = <Toast type="loading" title="加载数据" isBlock />;
    }

    let submiting;
    if (data.isUpdating) {
      submiting = <Toast type="loading" title="正在提交" isBlock />;
    }

    let success;
    if (this.state.isSuccess) {
      success = <Toast type="success" title="操作成功" onClose={this.handleSuccess} isBlock />;
    }

    let error;
    if (!loading && data.error) {
      error = <ShowError error={data.error} key={Math.random()} onClose={() => dispatch(cleanError())} />;
    }

    let pageWrapper;
    if (!data.isLoading) {
      pageWrapper = (<div>
        <PageHeader title={config.moduleName} subTitle={subTitle} />

        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId="title">
            <ControlLabel>标题</ControlLabel>
            <FormControl
              type="text"
              value={this.state.formTitle}
              placeholder="请输入标题"
              onChange={e => this.setState({ formTitle: e.target.value })}
            />
          </FormGroup>

          <FormGroup controlId="cateid">
            <ControlLabel>分类</ControlLabel>
            <CateSelect
              value={this.state.formCateId}
              onChange={e => this.setState({ formCateId: e.target.value })}
              options={data.cates}
            />
          </FormGroup>

          <FormGroup controlId="orderid">
            <ControlLabel>简介</ControlLabel>
            <FormControl
              componentClass="textarea"
              rows="6"
              value={this.state.formInfo}
              placeholder="请输入简介"
              onChange={e => this.setState({ formInfo: e.target.value })}
            />
          </FormGroup>

          {id > 0 ? <FormGroup controlId="orderid">
            <ControlLabel>排序Id</ControlLabel>
            <FormControl
              type="number"
              value={this.state.formOrderId}
              placeholder="请输入排序编号"
              onChange={e => this.setState({ formOrderId: e.target.value })}
            />
          </FormGroup> : null}

          <FormToggle
            label="发布状态"
            checked={this.state.formIsPublish}
            onChange={() => this.setState({ formIsPublish: !this.state.formIsPublish })}
          />

          <FormSubmitBtn>
            <Row>
              <Col sm={2}>
                <BtnSubmit onItemClick={this.handleSubmit} />
              </Col>
              <Col sm={2}>
                <BtnCancel
                  onItemClick={() => { router.goBack(); }}
                />
              </Col>
            </Row>
          </FormSubmitBtn>

        </Form>
      </div>);
    }

    return (
      <div>
        <Helmet title={config.pageTitle} />
        <Navbar activeKey={config.module} />

        {loading && loading}
        {submiting && submiting}
        {success && success}
        {error && error}
        <PageWrapper>
          {pageWrapper}
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

export default connect(mapStateToProps)(McmlEdit);
