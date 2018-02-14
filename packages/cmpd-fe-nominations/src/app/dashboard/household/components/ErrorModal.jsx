// @flow
import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';

type Props = {
    title: string,
    message: string,
    show: boolean,
    handleClose: () => void
}

export default (props: Props) => {
  const {
        show,
        title = 'Submission error',
        message = 'There was an issue submitting your form.',
        handleClose
    } = props;
  return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} bsStyle="primary">
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
  );
};
