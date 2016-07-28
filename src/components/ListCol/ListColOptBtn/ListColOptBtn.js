import React from 'react';
import styles from './ListColOptBtn.css';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';

class ListColOptBtn extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    className: React.PropTypes.string
  }

  state = {}

  render() {
    const { children, className, ...rest } = this.props;
    return (
      <div className={`${styles.opt}${className ? ` ${className}` : ''}`} {...rest}>
        <ButtonToolbar className="pull-right">
          <DropdownButton
            bsSize="small"
            title={<span><i className="fa fa-ellipsis-h fa-fw" /> 操作</span>}
            id="dropdown-size-small"
            pullRight
          >
            {children}
          </DropdownButton>
        </ButtonToolbar>
      </div>
		);
  }
}

export default ListColOptBtn;
