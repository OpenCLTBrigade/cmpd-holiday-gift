// @flow
import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Box from '../../components/box';

export default class HouseholdForm extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Box title="Head of Household Information" bsStyle="primary">
              <Row>
                <Col md={6} xs={12}>
                  <FormGroup>
                    <ControlLabel htmlFor="firstName">First Name</ControlLabel>
                    <FormControl name="firstName" id="firstName" type="text" required />
                  </FormGroup>
                </Col>
                <Col md={6} xs={12}>
                  <FormGroup>
                    <ControlLabel htmlFor="lastName">Last Name</ControlLabel>
                    <FormControl name="lastName" id="lastName" type="text" required />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4} xs={12}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Gender</ControlLabel>
                    <FormControl name="gender" componentClass="select" placeholder="select" required>
                      <option value="select">Select...</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col md={4} xs={12}>
                  <FormGroup>
                    <ControlLabel htmlFor="dob">Date of Birth</ControlLabel>
                    <FormControl id="dob" type="date" required />
                  </FormGroup>
                </Col>
                <Col md={4} xs={12}>
                  <FormGroup>
                    <ControlLabel htmlFor="ssn">Last four digits of SSN</ControlLabel>
                    <FormControl id="ssn" type="text" pattern="[0-9]{4}" required maxLength="4" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={4} xs={12}>
                  <FormGroup>
                    <ControlLabel htmlFor="email">Email</ControlLabel>
                    <FormControl id="email" type="email" required />
                  </FormGroup>
                </Col>
                <Col md={4} xs={12}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Preferred Contact Method</ControlLabel>
                    <FormControl name="gender" componentClass="select" placeholder="select" required>
                      <option value="">Select...</option>
                      <option value="email">Email</option>
                      <option value="text">Text</option>
                      <option value="phone">Phone</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col md={4} xs={12}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Ethnicity</ControlLabel>
                    <FormControl name="gender" componentClass="select" placeholder="select" required>
                      <option value="">Select...</option>
                      <option value="American Indian or Alaskan Native">American Indian or Alaskan Native</option>
                      <option value="Asian">Asian</option> <option value="African American">African American</option>
                      <option value="Hispanic">Hispanic</option>
                      <option value="Pacific Islander">Pacific Islander</option> <option value="White">White</option>
                      <option value="Other">Other</option>
                    </FormControl>
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
