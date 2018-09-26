import * as React from 'react';
import List from './list';
import { Row, Col } from 'react-bootstrap';
import Box from '../components/box';
import { FeedbackModal } from './components/FeedbackModal';
import { pathOr } from 'ramda';

export default class HouseholdIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { householdInReview: null };
  }

  getCurrentPageNumber = () => {
    const qs = querystring.parse();
    return pathOr(1, ['page'], qs);
  };

  openHouseholdReview = (householdInReview, listPageNumber) => {
    this.setState({ householdInReview });
  };

  closeHouseholdReview = () => {
    this.setState({ householdInReview: null });
    this.listComponent.handlePageChange(this.getCurrentPageNumber());
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Box title="Household List">
              <List
                user={this.props.user}
                openHouseholdReview={this.openHouseholdReview}
                ref={el => (this.listComponent = el)}
              />
            </Box>
          </Col>
        </Row>
        <FeedbackModal household={this.state.householdInReview} doClose={this.closeHouseholdReview} />
      </div>
    );
  }
}
