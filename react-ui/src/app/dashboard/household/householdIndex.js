// @flow

import * as React from 'react';
import List from './list';
import { Row, Col } from 'react-bootstrap';
import Box from '../components/box';
import { FeedbackModal } from './components/FeedbackModal';

export default class HouseholdIndex extends React.Component<{}> {

  constructor(props) {
    super(props);
    this.state = { householdInReview: null, listPageNumber: null };
  }

  openHouseholdReview = (householdInReview, listPageNumber) => {
    console.log('hm', householdInReview, 'd', listPageNumber);
    this.setState({ householdInReview, listPageNumber });
  }

  closeHouseholdReview = () => {
    this.setState({ householdInReview: null, listPageNumber: null });
    this.listComponent.handlePageChange(this.state.listPageNumber);
  }

  render(): React.Node {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Box title="Household List">

              <List user={this.props.user} openHouseholdReview={this.openHouseholdReview} ref={(el) => this.listComponent = el}/>
            </Box>
          </Col>
        </Row>
        <FeedbackModal household={this.state.householdInReview} doClose={this.closeHouseholdReview} />
      </div>
    );
  }
}
