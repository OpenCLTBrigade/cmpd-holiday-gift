// @flow
import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from './Form';

class FeedbackModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        approved: true,
        reason: '',
        message: ''
      }
    };
  }

  handleFormChange = (field, value) => {
    const s = { ...this.state };
    s[field] = value;
    this.setState(s);
  }

  render(): React.Node {
    const { user, handleClose } = this.props;

    if (user == null) {
      return null;
    }

    return (
      <Modal show={user != null}>
        <Modal.Header>
          <Modal.Title>Review Household</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form data={this.state.data} handleChange={this.hanleFormChange}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.doClose} bsStyle="default">
            Cancel
          </Button>
          <Button onClick={this.submitForm} bsStyle="primary">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default FeedbackModal;