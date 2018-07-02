import * as React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap';

import { field } from 'neoform';
import { fieldValidation } from 'neoform-validation';

const getValidationState = validationStatus => {
  if (validationStatus === false) {
    return 'error';
  }
  if (validationStatus) {
    return 'success';
  }

  return null;
};

class Input extends React.Component {
  static defaultProps = { value: '' };

  // otherProps: Object;

  constructor(props) {
    super(props);
    const {
      label,
      controlId,
      value,
      onChange,
      validate,
      validationStatus,
      validationMessage,
      children,
      inputRef,
      onBlur,
      ...rest
    } = this.props;
    this.otherProps = rest;
  }

  render() {
    return (
      <FormGroup controlId={this.props.controlId} validationState={getValidationState(this.props.validationStatus)}>
        <ControlLabel>{this.props.label}</ControlLabel>
        <FormControl
          value={this.props.value}
          onBlur={ev => {
            if (this.props.onBlur != null) {
              this.props.onBlur(ev);
            }
            return this.props.validate(ev);
          }}
          onChange={e => this.props.onChange(e.target.value)}
          inputRef={this.props.inputRef}
          {...this.otherProps}>
          {this.props.children}
        </FormControl>
        {this.props.validationStatus === false && <HelpBlock>{this.props.validationMessage}</HelpBlock>}
      </FormGroup>
    );
  }
}

export default field(fieldValidation(Input));
