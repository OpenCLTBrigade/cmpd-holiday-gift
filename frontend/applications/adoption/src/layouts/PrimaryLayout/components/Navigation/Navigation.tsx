import * as React from 'react';
import {
  Col,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  Row
  } from 'reactstrap';
export class Navigation extends React.PureComponent<{}, any> {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Navbar color="dark" dark={true} expand="md" className={`rounded`}>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar={true} className={`justify-content-md-center`}>
                <Nav navbar={true}>
                  <NavItem>
                    <NavLink href="/about/">About</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/adopt/">Adopt a Child</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/volunteer/">Volunteer</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/faq/">FAQ</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Navigation;
