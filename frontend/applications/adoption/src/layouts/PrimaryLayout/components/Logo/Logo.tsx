import * as React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import './logo.css';

export const Logo: React.SFC<{}> = _props => (
  <Container>
    <Row>
      <Col>
        <Link to="/">
          <img src={`/img/logo.jpg`} className={`logo`} />
        </Link>
      </Col>
    </Row>
  </Container>
);

export default Logo;
