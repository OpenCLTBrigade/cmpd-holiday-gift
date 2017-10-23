// @flow
import * as React from 'react';
import { Checkbox as FieldCheckbox } from 'react-bootstrap';

import { Field } from 'neoform';

const Checkbox = ({ name, label, onChange, value, ...props }) => {

  return <FieldCheckbox name={name} checked={value} onChange={e => onChange(e.target.checked)} {...props}>
    {label}
  </FieldCheckbox>;
};

export default Field(Checkbox);
