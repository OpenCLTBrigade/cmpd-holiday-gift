// @flow
import React from 'react';
import { FormControl } from 'react-bootstrap';

import { Field } from 'neoform';
import { FieldValidation } from 'neoform-validation';

const Input = ({ value = '', onChange, validate, validationStatus, validationMessage, ...props }) =>
  <div>
    <FormControl {...props} value={value} onBlur={validate} onChange={e => onChange(e.target.value)} />
    {validationStatus === false &&
      <span>
        {validationMessage}
      </span>}
  </div>;

export default Field(FieldValidation(Input));
