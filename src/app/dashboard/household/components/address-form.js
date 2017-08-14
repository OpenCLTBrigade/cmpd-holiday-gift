// @flow
import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Box from '../../components/box';

export default class AddressForm extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Box title="Delivery Address">
              <Row>
                <Col md={4} xs={12}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Type</ControlLabel>
                    <FormControl name="deliveryAddressType" componentClass="select" placeholder="select" required>
                      <option value="select">Select...</option>
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col md={4} xs={12}>
                  <FormGroup>
                    <ControlLabel htmlFor="addressLine1">Street Address</ControlLabel>
                    <FormControl
                      id="streetAddress"
                      name="addressLine1"
                      type="text"
                      required
                      autoComplete="shipping address-line1"
                    />
                  </FormGroup>
                </Col>
                <Col md={4} xs={12}>
                  <FormGroup>
                    <ControlLabel htmlFor="addressLine2">Street Address 2</ControlLabel>
                    <FormControl
                      id="streetAddress"
                      name="addressLine2"
                      type="text"
                      required
                      autoComplete="shipping address-line2"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4} xs={12}>
                  <FormGroup>
                    <ControlLabel htmlFor="city">City</ControlLabel>
                    <FormControl id="city" name="city" type="text" required autoComplete="shipping locality city" />
                  </FormGroup>
                </Col>
                <Col md={4} xs={12}>
                  <FormGroup>
                    <ControlLabel htmlFor="state">State</ControlLabel>
                    <FormControl id="state" name="state" type="text" required autoComplete="shipping region state" />
                  </FormGroup>
                </Col>
                <Col md={4} xs={12}>
                  <FormGroup>
                    <ControlLabel htmlFor="zip">Zip Code</ControlLabel>
                    <FormControl
                      id="zip"
                      name="zip"
                      type="text"
                      required
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
      </div>
    );
  }
}
