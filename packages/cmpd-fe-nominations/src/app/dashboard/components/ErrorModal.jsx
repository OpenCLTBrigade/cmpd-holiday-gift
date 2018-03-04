import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { flatten } from 'rambda';

const ValidationError = ({ error }) => <li>{error}</li>;

const ValidationErrorSummary = ({ errors = [] }) => {
  const errorList = flatten(errors.map(({ constraints }) => Object.values(constraints)));

  return <ul>{errorList.map(error => <ValidationError error={error} />)}</ul>;
};

export default props => {
  const {
    show,
    title = 'Submission error',
    message = 'There was an issue submitting your form.',
    validationErrors = [],
    handleClose
  } = props;
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{message}</h4>
        <ValidationErrorSummary errors={validationErrors} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} bsStyle="primary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
