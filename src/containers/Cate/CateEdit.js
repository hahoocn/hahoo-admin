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
  Toast,
  ShowError,
  FormToggle,
  CateSelect
} from '../../components';
import { add, update, getEditDetails, cleanError, cleanLoading, setError } from '../../actions/cate';
import { responseError } from '../../api/utils';
import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import Row from 'react-bootstrap/lib/Row';
import isFloat from 'validator/lib/isFloat';
import toFloat from 'validator/lib/toFloat';

class CateEdit extends React.Component {
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
    formParentId: undefined
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
          formParentId: details.parentId
        });
      } else {
        dispatch(getEditDetails(config.api.resource, id, config.api.cateResource));
      }
    }
    this.setState({ formParentId: data.parentId });
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
          formParentId: details.parentId
        });
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { id, formTitle, formInfo, formIsPublish, formParentId } = this.state;
    if (formTitle.length === 0) {
      dispatch(setError(responseError('请输入标题')));
    } else if (formParentId.length === 0) {
      dispatch(setError(responseError('请选择上级分类')));
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
          parentId: formParentId
        }));
      }
    } else {
      dispatch(add(config.api.resource, {
        title: formTitle,
        info: formInfo,
        isPublish: formIsPublish,
        parentId: formParentId
      }));
    }
  }

  handleSuccess() {
    if (this.state.id > 0) {
      this.context.router.goBack();
    } else {
      this.context.router.replace(`/${config.module}/list?parentid=${this.props.data.parentId}`);
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

    let loading = undefined;
    if (data.isLoading) {
      loading = <Toast type="loading" title="加载数据" isBlock />;
    }

    let submiting = undefined;
    if (data.isUpdating) {
      submiting = <Toast type="loading" title="正在提交" isBlock />;
    }

    let success = undefined;
    if (this.state.isSuccess) {
      success = <Toast type="success" title="操作成功" onClose={this.handleSuccess} isBlock />;
    }

    let error = undefined;
    if (!loading && data.error) {
      error = <ShowError error={data.error} key={Math.random()} onClose={() => dispatch(cleanError())} />;
    }

    let pageWrapper = undefined;
    if (!data.isLoading) {
      pageWrapper = <div>
        <PageHeader title={config.moduleName} subTitle={subTitle} />

        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId="title">
            <ControlLabel>标题</ControlLabel>
            <FormControl
              type="text"
              value={this.state.formTitle}
              placeholder="请输入标题"
              onChange={(e) => this.setState({ formTitle: e.target.value })}
            />
          </FormGroup>

          <FormGroup controlId="parentid">
            <ControlLabel>上级分类</ControlLabel>
            {id === 0 && <FormControl componentClass="select" disabled>
              <option value={this.state.formParentId}>{data.parentId > 0 ? data.parentName : '根分类'}</option>
            </FormControl>}
            {id > 0 && <CateSelect
              value={this.state.formParentId}
              onChange={(e) => this.setState({ formParentId: e.target.value })}
              preOptions={[{ id: 0, title: '根分类' }]}
              options={data.cates}
            />}
          </FormGroup>

          <FormGroup controlId="orderid">
            <ControlLabel>简介</ControlLabel>
            <FormControl
              componentClass="textarea"
              rows="6"
              value={this.state.formInfo}
              placeholder="请输入简介"
              onChange={(e) => this.setState({ formInfo: e.target.value })}
            />
          </FormGroup>

          {id > 0 && <FormGroup controlId="orderid">
            <ControlLabel>排序Id</ControlLabel>
            <FormControl
              type="number"
              value={this.state.formOrderId}
              placeholder="请输入排序编号"
              onChange={(e) => this.setState({ formOrderId: e.target.value })}
            />
          </FormGroup>}

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
      </div>;
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
    data: state.cate
  };
  return select;
};

export default connect(mapStateToProps)(CateEdit);
