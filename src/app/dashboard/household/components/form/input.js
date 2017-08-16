// @flow
import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

import { Field } from 'neoform';
import { FieldValidation } from 'neoform-validation';

const getValidationState = validationStatus => {
  if (validationStatus === false) {
    return 'error';
  }
  if (validationStatus) {
    return 'success';
  }

  return null;
};

const Input = ({
  label,
  controlId,
  value = '',
  onChange,
  validate,
  validationStatus,
  validationMessage,
  children,
  ...props
}) =>
  <FormGroup controlId={controlId} validationState={getValidationState(validationStatus)}>
    <ControlLabel>
      {label}
    </ControlLabel>
    <FormControl value={value} onBlur={validate} onChange={e => onChange(e.target.value)} {...props}>
      {children && children}
    </FormControl>
    {validationStatus === false &&
      <HelpBlock>
        {validationMessage}
      </HelpBlock>}
  </FormGroup>;

export default Field(FieldValidation(Input));
