import React from 'react';
import { IndexLink } from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

class TopNavbar extends React.Component {
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
    require('./TopNavbar.css');
    return (
      <Navbar staticTop expanded={this.state.navExpanded} onToggle={this.onNavbarToggle}>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/" onClick={this.onNavItemClick} activeStyle={{ color: '#33e0ff' }}>
              <span>HahooApp</span>
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse eventKey={0}>
          <Nav navbar pullRight>
            <NavItem eventKey={1} onClick={this.onNavItemClick} target="_blank" title="View on Github" href="https://github.com/hahoocn/hahoo-admin">
              <i className="fa fa-github" />
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
		);
  }
}

export default TopNavbar;
