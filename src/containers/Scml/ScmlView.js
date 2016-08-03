import React from 'react';
import Helmet from 'react-helmet';
import config from './config';
import {
  Navbar,
  PageWrapper,
  PageHeader,
  Detail,
  DetailTitle,
  DetailContent,
  LabelPublish,
  BtnBack,
  BtnEdit,
  BtnDel,
} from '../../components';
import { LinkContainer } from 'react-router-bootstrap';
import Col from 'react-bootstrap/lib/Col';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';

class ScmlView extends React.Component {
  static propTypes = {
    params: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  state = {}

  render() {
    // const { params } = this.props;
    // const id = parseInt(params.id, 0);
    // const { router } = this.context;
    return (
      <div>
        <Helmet title={config.pageTitle} />
        <Navbar activeKey="scml" />

        <PageWrapper>
          <PageHeader title="单分类多条目" subTitle="详情">
            <ButtonToolbar>
              <BtnBack />
              <LinkContainer to="/scml/edit/1">
                <BtnEdit />
              </LinkContainer>
              <BtnDel />
            </ButtonToolbar>
          </PageHeader>

          <Detail>
            <Col componentClass={DetailTitle} sm={2}>
              标题
            </Col>
            <Col componentClass={DetailContent} sm={10}>
              这个是标题，标题要长一点。
            </Col>
          </Detail>

          <Detail>
            <Col componentClass={DetailTitle} sm={2}>
              排序Id
            </Col>
            <Col componentClass={DetailContent} sm={8}>
              这个是标题，标题要长一点。这个是标题，标题要长一点。这个是标题，标题要长一点。
              这个是标题，标题要长一点。这个是标题，标题要长一点。这个是标题，标题要长一点。这个是标题，标题要长一点。
              这个是标题，标题要长一点。这个是标题，标题要长一点。这个是标题，标题要长一点。
              这个是标题，标题要长一点。这个是标题，标题要长一点。这个是标题，标题要长一点。
            </Col>
          </Detail>

          <Detail>
            <Col componentClass={DetailTitle} sm={2}>
              发布状态
            </Col>
            <Col componentClass={DetailContent} sm={8}>
              <LabelPublish />
            </Col>
          </Detail>

        </PageWrapper>

      </div>
    );
  }
}

export default ScmlView;
