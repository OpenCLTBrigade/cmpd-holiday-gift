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
              <ul>
                {/* TODO: only show restricted reports if user is admin */}
                <li><button onClick={getReport('all')}>Export data in Excel format</button></li>
                <li><button onClick={getReport('link')}>Generate Link Report</button></li>
                <li><button onClick={getReport('bikes')}>Generate Bicycle Report</button></li>
              </ul>
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
