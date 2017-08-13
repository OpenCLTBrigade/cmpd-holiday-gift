// @flow
import React from 'react';

const ErrorMessage = ({
  errorMessage,
  onDismissError
}: {
  errorMessage: ?string,
  onDismissError: Function
}): React.Element<any> | null =>
  !errorMessage
    ? null
    : <div className="alert alert-danger validation">
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => onDismissError()}>
          <span aria-hidden="true">×</span>
        </button>
        <span>
          {errorMessage}
        </span>
      </div>;

export default ErrorMessage;
