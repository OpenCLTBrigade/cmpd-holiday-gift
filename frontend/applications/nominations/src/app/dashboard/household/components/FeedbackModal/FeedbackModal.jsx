import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from './Form';
import { reviewHousehold } from '../../../../../api/household';

const DEFAULT_STATE = {
  data: {
    approved: true,
    reason: '',
    message: ''
  }
};

class FeedbackModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  handleFormSubmit = async () => {
    const { approved, reason, message } = this.state.data;

    try {
      await reviewHousehold(this.props.household.id, {
        approved,
        reason,
        message
      });
    } catch (error) {
      alert('Could not review household. Please try again later.');
    } finally {
      this.handleClose({ approved, reason, message, reviewed: true });
    }
  };

  handleClose = ({ approved, reason, message, reviewed } = {}) => {
    this.setState(DEFAULT_STATE);
    this.props.doClose({ approved, reason, message, reviewed });
  };

  handleFormChange = (field, value) => {
    const s = { ...this.state };
    s.data[field] = value;
    this.setState(s);
  };

  render() {
    const { household, handleClose } = this.props;

    if (household == null) {
      return null;
    }

    return (
      <Modal show={household != null}>
        <Modal.Header>
          <Modal.Title>Review Household</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {household.address &&
            (!household.address.cmpdDivision || !household.address.cmpdResponseArea) && (
              <span style={{ fontWeight: 'bold' }}>
                Warning: Address is missing CMPD Division / Response Area<hr />
              </span>
            )}
          <Form
            data={this.state.data}
            handleFormSubmit={this.handleFormSubmit}
            handleFormChange={this.handleFormChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose} bsStyle="default">
            Cancel
          </Button>
          <Button onClick={this.handleFormSubmit} bsStyle="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FeedbackModal;
