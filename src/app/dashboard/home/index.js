import React from 'react';
import Box from '../components/box';
import { Row, Col } from 'react-bootstrap';

export default class Home extends React.Component {
  render(): React.Element<any> {
    return (
      <div>
        {/* Quick Overview */}
        <Row>
          <Col md={6}>
            <Box title="Quick Overview">
              Home
            </Box>
          </Col>
        </Row>
        {/* Reports */}
        <Row>
          <Col md={6}>
            <Box title="Reports">
              Reports
            </Box>
          </Col>
        </Row>
        {/* Packing slips */}
        <Row>
          <Col md={6}>
            <Box title="Packing Slips">
              Packing Slips
            </Box>
          </Col>
        </Row>
      </div>
    );
  }
}
