import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import config from './config';
import {
  Navbar,
  PageWrapper,
  PageHeader,
  FormSubmitBtn,
  BtnCancel,
  BtnSubmit,
  Toggle,
  ToastAlert,
  Toast
} from '../../components';

import { edit, cleanAsyncStatus, getEditDetails } from '../../actions/scml';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import isFloat from 'validator/lib/isFloat';
import toFloat from 'validator/lib/toFloat';

class ScmlEdit extends React.Component {
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
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handlePubSwitch = this.handlePubSwitch.bind(this);
    this.cleanErr = this.cleanErr.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  state = {
    id: 0,
    err: undefined,
    isSubmiting: false,
    isSuccess: false,
    formTitle: '',
    formInfo: '',
    formIsPublish: true,
    formOrderId: 0
  }

  componentWillMount() {
    const id = parseInt(this.props.params.id, 10);
    if (id) {
      this.setState({ id });
    }
    this.props.dispatch(cleanAsyncStatus('edit'));

    if (id > 0) {
      const { details } = this.props.data;
      if (details && details.id === id) {
        this.setState({
          formTitle: details.title,
          formInfo: details.info,
          formIsPublish: details.isPublish === 1,
          formOrderId: details.orderId
        });
      } else {
        this.props.dispatch(getEditDetails(id));
      }
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props;
    if (data.asyncStatus && data.asyncStatus.edit &&
      nextProps.data.asyncStatus && nextProps.data.asyncStatus.edit) {
      if (data.asyncStatus.edit.isFetching && !nextProps.data.asyncStatus.edit.isFetching &&
      !nextProps.data.asyncStatus.edit.err) {
        this.setState({ isSuccess: true });
      }
    }
    if (data.asyncStatus && data.asyncStatus.editdetails &&
      data.asyncStatus.editdetails.isFetching &&
      !nextProps.data.asyncStatus.editdetails.isFetching) {
      const { details } = nextProps.data;
      if (details && details.id === this.state.id) {
        this.setState({
          formTitle: details.title,
          formInfo: details.info,
          formIsPublish: details.isPublish === 1,
          formOrderId: details.orderId
        });
      }
    }
  }

  handleTitleChange(event) {
    this.setState({ formTitle: event.target.value, err: undefined });
  }

  handleInfoChange(event) {
    this.setState({ formInfo: event.target.value, err: undefined });
  }

  handlePubSwitch() {
    this.setState({ formIsPublish: !this.state.formIsPublish, err: undefined });
  }

  cleanErr() {
    this.setState({ err: undefined });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { id, formTitle, formInfo, formIsPublish } = this.state;
    if (formTitle.length === 0) {
      this.setState({ err: '请输入标题' });
    } else if (this.state.id > 0) {
      if (this.state.formOrderId <= 0) {
        this.setState({ err: '排序Id请输入大于0的数字' });
      } else if (!isFloat(`${this.state.formOrderId}`)) {
        this.setState({ err: '排序Id请输入数字' });
      } else {
        const orderId = toFloat(`${this.state.formOrderId}`);
        this.props.dispatch(edit({
          id,
          title: formTitle,
          info: formInfo,
          isPublish: formIsPublish,
          orderId
        }));
        this.setState({ isSubmiting: true });
      }
    } else {
      this.props.dispatch(edit({
        id,
        title: formTitle,
        info: formInfo,
        isPublish: formIsPublish
      }));
      this.setState({ isSubmiting: true });
    }
  }

  handleSuccess() {
    if (this.state.id > 0) {
      this.context.router.goBack();
    } else {
      this.context.router.replace('/scml/list');
    }
  }

  render() {
    const { router } = this.context;
    const { data } = this.props;
    const id = this.state.id;
    let subTitle = '添加';
    if (id > 0) {
      subTitle = '修改';
    }

    let loading = undefined;
    if ((data.asyncStatus && data.asyncStatus.editdetails &&
      data.asyncStatus.editdetails.isFetching)) {
      loading = <Toast type="loading" title="加载数据" isBlock />;
    }

    let submiting = undefined;
    if (data.asyncStatus && data.asyncStatus.edit && data.asyncStatus.edit.isFetching) {
      submiting = <Toast type="loading" title="正在提交" isBlock />;
    }

    let success = undefined;
    if (this.state.isSuccess) {
      success = <Toast type="success" title="操作成功" onClose={this.handleSuccess} isBlock />;
    }

    let pageWrapper = undefined;
    if (!data.asyncStatus || !data.asyncStatus.editdetails ||
      !data.asyncStatus.editdetails.isFetching) {
      pageWrapper = <div>
        <PageHeader title={config.moduleName} subTitle={subTitle} />

        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="title">
            <Col componentClass={ControlLabel} sm={2}>
              标题
            </Col>
            <Col sm={4}>
              <FormControl
                type="text"
                value={this.state.formTitle}
                onChange={this.handleTitleChange}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="orderid">
            <Col componentClass={ControlLabel} sm={2}>
              简介
            </Col>
            <Col sm={6}>
              <FormControl
                componentClass="textarea"
                rows="6"
                value={this.state.formInfo}
                onChange={this.handleInfoChange}
              />
            </Col>
          </FormGroup>

          {id > 0 ? <FormGroup controlId="orderid">
            <Col componentClass={ControlLabel} sm={2}>
              排序Id
            </Col>
            <Col sm={2}>
              <FormControl
                type="number"
                value={this.state.formOrderId}
                onChange={(e) => this.setState({ formOrderId: e.target.value, err: undefined })}
              />
            </Col>
          </FormGroup> : null}

          <FormGroup controlId="orderid">
            <Col componentClass={ControlLabel} sm={2}>
              发布状态
            </Col>
            <Col sm={2}>
              <Toggle checked={this.state.formIsPublish} onChange={this.handlePubSwitch} />
            </Col>
          </FormGroup>

          <FormSubmitBtn controlId="submitBtn">
            <Col smOffset={2} sm={2}>
              <BtnSubmit onItemClick={this.handleSubmit} />
            </Col>
            <Col sm={2}>
              <BtnCancel
                className="hidden-xs hidden-sm"
                onItemClick={() => { router.goBack(); }}
              />
            </Col>
          </FormSubmitBtn>

        </Form>
      </div>;
    }

    return (
      <div>
        <Helmet title={config.pageTitle} />
        <Navbar activeKey="scml" />

        {this.state.err ?
          <ToastAlert info={this.state.err} key={Math.random()} onClose={this.cleanErr} /> : null}

        {loading && loading}
        {submiting && submiting}
        {success && success}
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

export default connect(mapStateToProps)(ScmlEdit);
