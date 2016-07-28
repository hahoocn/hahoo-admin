import React from 'react';
import Helmet from 'react-helmet';
import config from './config';
import {
  Navbar,
  PageWrapper,
  PageHeader,
  List,
  ListRow,
  ListColText,
  ListColStatus,
  ListColTime,
  ListColOrder,
  ListColOptBtn,
  LabelPublish,
  // LabelUnPublish,
  BtnView,
  BtnEdit,
  BtnDel,
  BtnPub,
  BtnUnPub,
  BtnMoveUp,
  BtnMoveDown,
  BtnMoveId,
  BtnAdd,
  Pagination,
  Dialog
} from '../../components';
import { LinkContainer } from 'react-router-bootstrap';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import FormControl from 'react-bootstrap/lib/FormControl';

class Scml extends React.Component {
  constructor(props) {
    super(props);
    this.pageSelect = this.pageSelect.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleDelConfirm = this.handleDelConfirm.bind(this);
    this.handlePub = this.handlePub.bind(this);
    this.handleUnPub = this.handleUnPub.bind(this);
    this.handleMoveUp = this.handleMoveUp.bind(this);
    this.handleMoveDown = this.handleMoveDown.bind(this);
    this.handleMoveId = this.handleMoveId.bind(this);
    this.handleMoveIdConfirm = this.handleMoveIdConfirm.bind(this);
  }

  state = {
    activePage: 1,
    showDelDialog: false,
    showMoveIdDialog: false,
    delId: undefined,
    moveId: undefined
  }

  pageSelect(page) {
    this.setState({ activePage: page });
  }

  handleDel(id) {
    this.setState({ showDelDialog: true, delId: id });
  }

  handleDelConfirm(code) {
    console.log(`${code} - ${this.state.delId}`);
    this.setState({ showDelDialog: false, delId: undefined });
  }

  handlePub(id) {
    console.log(id);
  }

  handleUnPub(id) {
    console.log(id);
  }

  handleMoveUp(id) {
    console.log(id);
  }

  handleMoveDown(id) {
    console.log(id);
  }

  handleMoveId(id) {
    this.setState({ showMoveIdDialog: true, moveId: id });
  }

  handleMoveIdConfirm(orderId) {
    console.log(`${orderId} - ${this.state.moveId}`);
    this.setState({ showMoveIdDialog: false, moveId: undefined });
  }

  render() {
    return (
      <div>
        <Helmet title={config.pageTitle} />
        <Navbar />

        {this.state.showDelDialog ?
          <Dialog title="确认" info="您确定删除吗？" type="confirm" onClick={this.handleDelConfirm} /> : ''}

        {this.state.showMoveIdDialog ?
          <Dialog
            title="修改排序码"
            info={<FormControl type="text" />}
            type="confirm"
            onClick={this.handleMoveIdConfirm}
          /> : ''}

        <PageWrapper>
          <PageHeader title={config.moduleName} subTitle="列表">
            <ButtonToolbar>
              <LinkContainer to="/scml/add">
                <BtnAdd />
              </LinkContainer>
            </ButtonToolbar>
          </PageHeader>

          <List>
            <ListRow>

              <ListColText className="col-xs-12 col-sm-4">
                <LinkContainer to="/scml/view/1">
                  <a>这个是标题，标题要长.这个是标题，标题要长这个是标题，标题要长这个是标题，标题要长</a>
                </LinkContainer>
              </ListColText>

              <ListColStatus className="col-xs-8 col-sm-3">
                <LabelPublish />
                <ListColTime>2016-10-24</ListColTime>
              </ListColStatus>

              <ListColOrder className="col-xs-12 col-sm-3" orderId={100} />

              <ListColOptBtn className="col-xs-4 col-sm-2">
                <LinkContainer to="/scml/view/1">
                  <BtnView eventKey="1" dropdown />
                </LinkContainer>
                <LinkContainer to="/scml/edit/1">
                  <BtnEdit eventKey="2" dropdown />
                </LinkContainer>
                <BtnDel eventKey="3" dropdown itemId={10} onItemClick={this.handleDel} />
                <BtnPub eventKey="4" dropdown itemId={11} onItemClick={this.handlePub} />
                <BtnUnPub eventKey="5" dropdown itemId={12} onItemClick={this.handleUnPub} />
                <MenuItem divider className="visible-xs-block" />
                <BtnMoveUp
                  eventKey="6"
                  dropdown
                  className="visible-xs-block"
                  itemId={13} onItemClick={this.handleMoveUp}
                />
                <BtnMoveDown
                  eventKey="7"
                  dropdown
                  className="visible-xs-block"
                  itemId={14} onItemClick={this.handleMoveDown}
                />
                <BtnMoveId
                  eventKey="8"
                  orderId={100}
                  dropdown
                  className="visible-xs-block"
                  itemId={15} onItemClick={this.handleMoveId}
                />
              </ListColOptBtn>

            </ListRow>
          </List>

          <Pagination
            page={this.state.activePage}
            pageCount={120}
            recordCount={2395}
            pageSelect={this.pageSelect}
          />

        </PageWrapper>

      </div>
		);
  }
}

export default Scml;
