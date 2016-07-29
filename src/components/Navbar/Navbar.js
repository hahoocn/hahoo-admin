import React from 'react';
import config from '../../config';
import { IndexLink } from 'react-router';
import { IndexLinkContainer, LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import SideNavDropdown from '../SideNavDropdown/SideNavDropdown';
import './Navbar.css';

class TopNavbar extends React.Component {
  static propTypes = {
    activeKey: React.PropTypes.string
  }

  state = {
    navExpanded: false
  }

  onNavItemClick = () => {
    this.setState({ navExpanded: false });
  }

  onNavbarToggle = () => {
    this.setState({ navExpanded: ! this.state.navExpanded });
  }

  render() {
    const { activeKey } = this.props;
    return (
      <Navbar
        staticTop
        fluid
        expanded={this.state.navExpanded}
        onToggle={this.onNavbarToggle}
      >
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/" onClick={this.onNavItemClick}>
              {config.app.title}
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <div className="navbar-default sidebar" role="navigation">
            <Nav activeKey={activeKey}>

              <IndexLinkContainer to="/">
                <NavItem eventKey={1} title="首页" onClick={this.onNavItemClick}>
                  <i className="fa fa-dashboard fa-fw" /> 首页
                </NavItem>
              </IndexLinkContainer>

              <LinkContainer eventKey="scml" to="/scml/list">
                <NavItem onClick={this.onNavItemClick}>
                  <i className="fa fa-cube fa-fw" /> 单分类多条目
                </NavItem>
              </LinkContainer>

              <SideNavDropdown
                title={<span><i className="fa fa-cubes fa-fw" /> 多分类多条目</span>}
              >

                <LinkContainer to="/mcml">
                  <NavItem eventKey={3} onClick={this.onNavItemClick}>
                    <i className="fa fa-file-text-o fa-fw" /> 内容列表
                  </NavItem>
                </LinkContainer>

                <LinkContainer to="/mcml/cate">
                  <NavItem eventKey={4} onClick={this.onNavItemClick}>
                    <i className="fa fa-th-list fa-fw" /> 分类管理
                  </NavItem>
                </LinkContainer>

              </SideNavDropdown>


              <SideNavDropdown title={<span><i className="fa fa-sitemap fa-fw" /> 多级下拉</span>}>
                <LinkContainer to="/">
                  <NavItem eventKey={5} onClick={this.onNavItemClick}>
                    二级条目
                  </NavItem>
                </LinkContainer>
                <LinkContainer to="/">
                  <NavItem eventKey={6} onClick={this.onNavItemClick}>
                    二级条目
                  </NavItem>
                </LinkContainer>

                <SideNavDropdown
                  isThirdLevel
                  title="三级"
                >
                  <LinkContainer to="/">
                    <NavItem eventKey={7} onClick={this.onNavItemClick}>
                      三级条目
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <NavItem eventKey={8} onClick={this.onNavItemClick}>
                      三级条目
                    </NavItem>
                  </LinkContainer>
                </SideNavDropdown>

              </SideNavDropdown>


              <LinkContainer to="/settings">
                <NavItem eventKey={9} onClick={this.onNavItemClick}>
                  <i className="fa fa-cog fa-fw" /> 系统设置
                </NavItem>
              </LinkContainer>

            </Nav>
          </div>
          <Nav pullRight>
            <NavDropdown
              eventKey={3}
              title={<i className="fa fa-user fa-fw"> 帐户 </i>}
              id="nav-dropdown"
            >
              <MenuItem eventKey={3.1}><i className="fa fa-sign-out fa-fw" /> 退出</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
		);
  }
}

export default TopNavbar;
