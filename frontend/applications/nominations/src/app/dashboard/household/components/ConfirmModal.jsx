import * as React from 'react';
import { Button, Modal, ButtonToolbar } from 'react-bootstrap';

// type Props = {
//     title: string,
//     message: string,
//     show: boolean,
//     handleClose: () => void
// }

export default props => {
  const {
    show,
    title = 'Save successful',
    message = 'Your nomination has been saved successfully.',
    onReject,
    onConfirm,
    rejectText = 'Reject',
    confirmText = 'Confirm'
  } = props;
  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <ButtonToolbar>
          <Button onClick={onReject}>{rejectText}</Button>
          <Button onClick={onConfirm} bsStyle="primary">
            {confirmText}
          </Button>
        </ButtonToolbar>
      </Modal.Footer>
    </Modal>
  );
};
