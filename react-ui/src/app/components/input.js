// @flow
import * as React from 'react';
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

class Input extends React.Component<{
  label: string,
  controlId: string,
  value: string,
  onChange: *,
  validate: *,
  validationStatus: *,
  validationMessage: *,
  children: React.Node,
  inputRef: (HTMLInputElement) => mixed,
  onBlur: (FocusEvent) => mixed
}> {
  static defaultProps = { value: '' };

  otherProps: Object;

  constructor(props) {
    super(props);
    const {
      label, controlId, value, onChange, validate, validationStatus,
      validationMessage, children, inputRef, onBlur, ...rest
    } = this.props;
    this.otherProps = rest;
  }

  render(): React.Node {
    return <FormGroup controlId={this.props.controlId}
                      validationState={getValidationState(this.props.validationStatus)}>
      <ControlLabel>
        {this.props.label}
      </ControlLabel>
      <FormControl
        value={this.props.value}
        onBlur={(ev) => {
          if (this.props.onBlur != null) {
            this.props.onBlur(ev);
          }
          return this.props.validate(ev);
        }}
        onChange={e => this.props.onChange(e.target.value)}
        inputRef={this.props.inputRef}
        {...this.otherProps}
      >
        {this.props.children}
      </FormControl>
      {this.props.validationStatus === false &&
        <HelpBlock>
          {this.props.validationMessage}
        </HelpBlock>}
    </FormGroup>;
  }
}

export default Field(FieldValidation(Input));
