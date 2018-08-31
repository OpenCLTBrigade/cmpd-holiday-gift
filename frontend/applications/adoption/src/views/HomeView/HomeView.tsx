import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
export const HomeView: React.SFC<{}> = _props => {
  return (
    <Grid>
      <Row>
        <Col>Homepage</Col>
      </Row>
    </Grid>
  );
};

export default HomeView;
