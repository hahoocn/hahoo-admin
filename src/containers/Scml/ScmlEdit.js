import React from 'react';
import Helmet from 'react-helmet';
import config from './config';
import {
  Navbar,
  PageWrapper,
  PageHeader,
  FormSubmitBtn,
  BtnCancel,
  BtnSubmit,
  Toggle
} from '../../components';

import Form from 'react-bootstrap/lib/Form';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';

class ScmlEdit extends React.Component {
  static propTypes = {
    params: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {}

  render() {
    const { params } = this.props;
    const { router } = this.context;
    const id = parseInt(params.id, 0);
    let subTitle = '添加';
    if (id > 0) {
      subTitle = '修改';
    }
    return (
      <div>
        <Helmet title={config.pageTitle} />
        <Navbar activeKey="scml" />

        <PageWrapper>
          <PageHeader title="单分类多条目" subTitle={subTitle} />

          <Form horizontal>
            <FormGroup controlId="title">
              <Col componentClass={ControlLabel} sm={2}>
                标题
              </Col>
              <Col sm={4}>
                <FormControl type="text" />
              </Col>
            </FormGroup>

            <FormGroup controlId="orderid">
              <Col componentClass={ControlLabel} sm={2}>
                排序Id
              </Col>
              <Col sm={2}>
                <FormControl type="number" />
              </Col>
            </FormGroup>

            <FormGroup controlId="orderid">
              <Col componentClass={ControlLabel} sm={2}>
                发布状态
              </Col>
              <Col sm={2}>
                <Toggle />
              </Col>
            </FormGroup>

            <FormSubmitBtn controlId="submitBtn">
              <Col smOffset={2} sm={2}>
                <BtnSubmit />
              </Col>
              <Col sm={2}>
                <BtnCancel className="hidden-xs hidden-sm" onClick={() => { router.goBack(); }} />
              </Col>
            </FormSubmitBtn>

          </Form>

        </PageWrapper>

      </div>
    );
  }
}

export default ScmlEdit;
