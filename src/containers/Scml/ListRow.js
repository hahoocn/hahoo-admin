import React from 'react';
import Link from 'react-router/lib/Link';
import { LinkContainer } from 'react-router-bootstrap';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import {
  ListRow,
  ListColText,
  ListColStatus,
  ListColTime,
  ListColOrder,
  ListColOptBtn,
  LabelPublish,
  LabelUnPublish,
  BtnView,
  BtnEdit,
  BtnDel,
  BtnPub,
  BtnUnPub,
  BtnMoveUp,
  BtnMoveDown,
  BtnMoveId,
} from '../../components';

class ListRowMain extends React.Component {
  static propTypes = {
    module: React.PropTypes.string.isRequired,
    item: React.PropTypes.object.isRequired,
    onDelete: React.PropTypes.func,
    onPublish: React.PropTypes.func,
    onUnPublish: React.PropTypes.func,
    onMoveUp: React.PropTypes.func,
    onMoveDown: React.PropTypes.func,
    onMoveTo: React.PropTypes.func,
    onPopOrderIdPannel: React.PropTypes.func
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.item !== this.props.item;
  }

  render() {
    const { item, onDelete, onPublish, onUnPublish, onMoveUp, onMoveDown } = this.props;
    const { onMoveTo, onPopOrderIdPannel, module } = this.props;

    return (
      <ListRow>
        <ListColText className="col-xs-12 col-sm-4">
          <Link to={`/${module}/view/${item.id}`}>
            {item.title}
          </Link>
        </ListColText>

        <ListColStatus className="col-xs-8 col-sm-3">
          {item.isPublish === 1 ?
            <LabelPublish /> :
            <LabelUnPublish />}
          <ListColTime>{item.updateTime}</ListColTime>
        </ListColStatus>

        <ListColOrder
          className="col-xs-12 col-sm-3"
          orderId={item.orderId}
          itemId={item.id}
          onUpClick={onMoveUp}
          onDownClick={onMoveDown}
          onChangeOrderId={onMoveTo}
        />

        <ListColOptBtn className="col-xs-4 col-sm-2">
          <LinkContainer to={`/${module}/view/${item.id}`}>
            <BtnView eventKey="1" dropdown />
          </LinkContainer>
          <LinkContainer to={`/${module}/edit/${item.id}`}>
            <BtnEdit eventKey="2" dropdown />
          </LinkContainer>
          <BtnDel eventKey="3" dropdown itemId={item.id} onItemClick={onDelete} />

          {item.isPublish === 1 ?
            <BtnUnPub eventKey="5" dropdown itemId={item.id} onItemClick={onUnPublish} /> :
            <BtnPub eventKey="4" dropdown itemId={item.id} onItemClick={onPublish} />}

          <MenuItem divider className="visible-xs-block" />

          <BtnMoveUp
            eventKey="6"
            className="visible-xs-block"
            itemId={item.id} onItemClick={onMoveUp}
          />
          <BtnMoveDown
            eventKey="7"
            className="visible-xs-block"
            itemId={item.id}
            onItemClick={onMoveDown}
          />
          <BtnMoveId
            eventKey="8"
            orderId={item.orderId}
            className="visible-xs-block"
            itemId={item.id}
            onItemClick={onPopOrderIdPannel}
          />
        </ListColOptBtn>
      </ListRow>
    );
  }
}

export default ListRowMain;
