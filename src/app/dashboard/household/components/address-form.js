// @flow
import React from 'react';
import { Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import { Form } from 'neoform';
import { FormValidation } from 'neoform-validation';

import Box from '../../components/box';
import Input from './form/input';
import requiredValidator from '../validators/required.validator';

const AddressForm = ({ onSubmit, validate, onInvalid }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        validate(onSubmit, onInvalid);
      }}
    >
      <Row>
        <Col xs={12}>
          <Box title="Delivery Address" bsStyle="danger">
            <Row>
              <Col md={4} xs={12}>
                <Input
                  label="Type"
                  controlId="formControlsSelect"
                  name="address.deliveryAddressType"
                  componentClass="select"
                  placeholder="select"
                  validator={requiredValidator}
                >
                  <option value="">Select...</option>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                </Input>
              </Col>
              <Col md={4} xs={12}>
                <Input
                  label="Street Address"
                  id="streetAddress"
                  name="address.addressLine1"
                  type="text"
                  validator={requiredValidator}
                  autoComplete="shipping address-line1"
                />
              </Col>
              <Col md={4} xs={12}>
                <Input
                  label="Street Address 2"
                  id="streetAddress"
                  name="address.addressLine2"
                  type="text"
                  autoComplete="shipping address-line2"
                />
              </Col>
            </Row>
            <Row>
              <Col md={4} xs={12}>
                <Input
                  label="City"
                  id="city"
                  name="address.city"
                  type="text"
                  validator={requiredValidator}
                  autoComplete="shipping locality city"
                />
              </Col>
              <Col md={4} xs={12}>
                <Input
                  label="State"
                  id="state"
                  name="address.state"
                  type="text"
                  validator={requiredValidator}
                  autoComplete="shipping region state"
                />
              </Col>
              <Col md={4} xs={12}>
                <Input
                  label="Zip Code"
                  id="zip"
                  name="address.zip"
                  type="text"
                  validator={requiredValidator}
                  pattern="(\d{5}([\-]\d{4})?)"
                  maxLength="5"
                  autoComplete="shipping postal-code"
                />
              </Col>
            </Row>
          </Box>
        </Col>
      </Row>
    </form>
  );
};

export default Form(FormValidation(AddressForm));
