// @flow
import * as React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

// approved: true,
// reason: '',
// message: ''

class Form extends React.Component {
  updateApproved = e => {
    let { value } = e.target;
    console.log('meh?', this.props.handleFormChange !== undefined);
    this.props.handleFormChange('approved', value === 1);
  };

  updateReason = e => {
    let { value } = e.target;
    this.props.handleFormChange('reason', value);
  };

  updateMessage = e => {
    let { value } = e.target;
    this.props.handleFormChange('message', value);
  };

  render() {
    const { approved, reason, message } = this.props.data;

    return (
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <label>Approved?</label>
            <select
              className="form-control"
              name="approved"
              onChange={this.updateApproved}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </Col>
        </Row>
        {approved === false && (
          <div>
            <Row>
              <Col xs={12}>
                <label>Reason for rejection</label>
                <select
                  className="form-control"
                  name="approved"
                  onChange={this.updateReason}>
                  <option>Duplicate Submission</option>
                  <option>Need additional information</option>
                  <option>Referred to third party</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <label>
                  Message to be sent to nominator (If blank, no email
                  notification will be sent)
                </label>
                <textarea
                  className="form-control"
                  onChange={this.updateMessage}
                />
              </Col>
            </Row>
          </div>
        )}
      </Grid>
    );
  }
}

export default Form;
