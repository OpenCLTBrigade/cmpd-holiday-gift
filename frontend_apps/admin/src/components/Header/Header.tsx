import * as React from 'react';
import { Navbar } from 'react-bootstrap';
import dashboardRoutes from '../../routes/dashboard';
import HeaderLinks from './HeaderLinks';

class Header extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle('nav-open');
    var node = document.createElement('div');
    node.id = 'bodyClick';
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle('nav-open');
    };
    document.body.appendChild(node);
  }
  getBrand() {
    var name;
    dashboardRoutes.map((prop: any, key) => {
      if (prop.redirect) {
        if (prop.path === this.props.location.pathname) {
          name = prop.name;
        }
      } else {
        if (prop.path === this.props.location.pathname) {
          name = prop.name;
        }
      }

      return null;
    });
    return name;
  }
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#pablo">{this.getBrand()}</a>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <HeaderLinks />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
