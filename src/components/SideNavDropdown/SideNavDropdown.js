import React from 'react';
import Collapse from 'react-bootstrap/lib/Collapse';
import './SideNavDropdown.css';

class SideNavDropdown extends React.Component {
  static defaultProps = {
    isCollapsed: true,
    title: undefined,
    isThirdLevel: false
  }

  static propTypes = {
    isCollapsed: React.PropTypes.bool,
    isThirdLevel: React.PropTypes.bool,
    title: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string
    ]),
    children: React.PropTypes.node,
  }

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    collapsed: true
  }

  componentWillMount() {
    if (this.props.isCollapsed !== this.state.collapsed) {
      this.setState({ collapsed: this.props.isCollapsed });
    }
  }

  handleClick() {
    this.setState({ collapsed: !this.state.collapsed });
    return false;
  }

  render() {
    let navClass = 'nav';
    navClass += this.props.isThirdLevel ? ' nav-third-level' : ' nav-second-level';

    let arrow = 'fa arrow';
    arrow += this.state.collapsed ? '' : ' down';
    return (
      <li>
        <a onClick={this.handleClick}>
          {this.props.title}
          <span className={arrow}></span>
        </a>
        <Collapse in={!this.state.collapsed}>
          <ul className={navClass}>
            {this.props.children}
          </ul>
        </Collapse>
      </li>
		);
  }
}

export default SideNavDropdown;
