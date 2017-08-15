// @flow
import React from 'react';
import { FormControl } from 'react-bootstrap';

import { Field } from 'neoform';

const Input = ({ value = '', onChange, ...props }) =>
  <FormControl {...props} value={value} onChange={e => onChange(e.target.value)} />;

export default Field(Input);
