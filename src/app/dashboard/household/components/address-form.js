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
      }}>
      <Row>
        <Col xs={12}>
          <Box title="Delivery Address" bsStyle="danger">
            <Row>
              <Col md={4} xs={12}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Type</ControlLabel>
                  <Input name="address.deliveryAddressType" componentClass="select" placeholder="select" required>
                    <option value="select">Select...</option>
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4} xs={12}>
                <FormGroup>
                  <ControlLabel htmlFor="addressLine1">Street Address</ControlLabel>
                  <Input
                    id="streetAddress"
                    name="address.addressLine1"
                    type="text"
                    validator={requiredValidator}
                    autoComplete="shipping address-line1"
                  />
                </FormGroup>
              </Col>
              <Col md={4} xs={12}>
                <FormGroup>
                  <ControlLabel htmlFor="addressLine2">Street Address 2</ControlLabel>
                  <Input
                    id="streetAddress"
                    name="address.addressLine2"
                    type="text"
                    autoComplete="shipping address-line2"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4} xs={12}>
                <FormGroup>
                  <ControlLabel htmlFor="city">City</ControlLabel>
                  <Input
                    id="city"
                    name="address.city"
                    type="text"
                    validator={requiredValidator}
                    autoComplete="shipping locality city"
                  />
                </FormGroup>
              </Col>
              <Col md={4} xs={12}>
                <FormGroup>
                  <ControlLabel htmlFor="state">State</ControlLabel>
                  <Input
                    id="state"
                    name="address.state"
                    type="text"
                    validator={requiredValidator}
                    autoComplete="shipping region state"
                  />
                </FormGroup>
              </Col>
              <Col md={4} xs={12}>
                <FormGroup>
                  <ControlLabel htmlFor="zip">Zip Code</ControlLabel>
                  <Input
                    id="zip"
                    name="address.zip"
                    type="text"
                    validator={requiredValidator}
                    pattern="(\d{5}([\-]\d{4})?)"
                    maxLength="5"
                    autoComplete="shipping postal-code"
                  />
                </FormGroup>
              </Col>
            </Row>
          </Box>
        </Col>
      </Row>
    </form>
  );
};

export default Form(FormValidation(AddressForm));
