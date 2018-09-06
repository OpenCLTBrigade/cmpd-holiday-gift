import * as React from 'react';
import {
  Button,
  Col,
  Container,
  Row
  } from 'reactstrap';
import './VolunteerView.css';

const VolunteerView: React.SFC<{}> = _props => {
  return (
    <Container id="page-volunteer">
      <Row>
        <Col md={4}>
          <a href="#">
            <img className="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="" />
          </a>
        </Col>
        <Col md={8}>
          <h3>Heading</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, odit velit cumque vero doloremque repellendus
            distinctio maiores rem expedita a nam vitae modi quidem similique ducimus!
          </p>
          <Button color={`primary`}>Sign up</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteerView;
