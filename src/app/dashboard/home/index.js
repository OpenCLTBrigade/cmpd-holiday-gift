// @flow

import * as React from 'react';
import Box from '../components/box';
import { Row, Col } from 'react-bootstrap';
import { redirectPostWithAuth } from 'lib/auth';

function getReport(name: string): (Event) => boolean {
  return (_event) => {
    redirectPostWithAuth('nominations', `report/${name}`);
    return false;
  };
}

export default class Home extends React.Component<{}> {
  render(): React.Node {
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
              {/* TODO: only show restricted reports if user is admin */}
              <button onClick={getReport('all')}>Export all data in Excel format</button>
              <button onClick={getReport('link')}>Generate Link Report</button>
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
