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
      return (
        <div>
          <Row>
            <Col xs={12}>
              <Box title="Welcome!">
                <p>Welcome to the CMPD Explorers Christmas Project Dashboard!</p>
                <p>
                  You can add and manage your nominations using the navigation menu to the left.
                  If you do not see the menu, please click the menu button (three lines) at the top
                  of the page.
                </p>
              </Box>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Box title="Tips">
                <ul>
                  <li>
                    When submitting a nomination you must first press save before you can upload the signed form.
                  </li>
                  <li>
                    File uploads will occur automatically when you select a file. After a few seconds the "Scanned Forms"
                    box will update with your uploaded file as a blue link.
                  </li>
                  <li>
                    When you submit your nomination it may take a moment; please avoid double clicking on the submit / save buttons.
                  </li>
                  <li>
                    If the form does not seem to be submitting, please scroll up and verify there are no fields outlined in red.
                  </li>
                </ul>
              </Box>
            </Col>
          </Row>
        </div>
      )
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
