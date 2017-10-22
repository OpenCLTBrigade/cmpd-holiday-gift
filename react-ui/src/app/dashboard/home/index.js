// @flow

import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Box from '../components/box';
import { redirectPostWithAuth } from 'lib/auth';

function getReport(name: string): (Event) => boolean {
  return (_event) => {
    redirectPostWithAuth('nominations', `report/${name}`);
    return false;
  };
}

export default class Home extends React.Component<{}> {
  render(): React.Node {
    const { user } = this.props;
    
    if (!user || user.role !== 'admin') {
      return null;
    }

    return (
      <div>
        {/* Quick Overview */}
        <Row>
          <Col md={6}>
            <Box title="Quick Overview">
              Reporting tools and stats are under construction...
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
                <li><button onClick={getReport('division')}>Generate Division Report</button></li>
              </ul>
            </Box>
          </Col>
        </Row>
        {/* Packing slips */}
        <Row>
          <Col md={6}>
            <Box title="Packing Slips">
              Packing Slips
              <ul>
                <li>
                  <Link to="/slips/packing" target="_blank">All packing slips</Link>
                </li>
              </ul>
            </Box>
          </Col>
        </Row>
      </div>
    );
  }
}
