import React, { Component } from 'react';
import List from './list';
import { Row, Col } from 'react-bootstrap';
import Box from '../components/box';

export default class HouseholdIndex extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Box title="Household List">
              <List />
            </Box>
          </Col>
        </Row>
      </div>
    );
  }
}
