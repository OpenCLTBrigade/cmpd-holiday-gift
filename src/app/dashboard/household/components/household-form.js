// @flow
import React from 'react';
import { Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import Box from '../../components/box';
import Input from './form/input';
import { Form } from 'neoform';
import { FormValidation } from 'neoform-validation';
import requiredValidator from '../validators/required.validator';

const HouseholdForm = ({ onSubmit, validate, onInvalid }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        validate(onSubmit, onInvalid);
      }}
    >
      <Row>
        <Col xs={12}>
          <Box title="Head of Household Information" bsStyle="primary">
            <Row>
              <Col md={6} xs={12}>
                <Input
                  label="First Name"
                  name="household.firstName"
                  id="firstName"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
              <Col md={6} xs={12}>
                <Input
                  label="Last Name"
                  name="household.lastName"
                  id="lastName"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={4} xs={12}>
                <Input
                  label="Gender"
                  name="household.gender"
                  componentClass="select"
                  placeholder="select"
                  validator={requiredValidator}
                >
                  <option value="select">Select...</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Input>
              </Col>
              <Col md={4} xs={12}>
                <Input label="Date of Birth" id="dob" name="household.dob" type="date" validator={requiredValidator} />
              </Col>
              <Col md={4} xs={12}>
                <Input
                  label="Last four digits of SSN"
                  id="ssn"
                  name="household.ssn"
                  type="text"
                  pattern="[0-9]{4}"
                  validator={requiredValidator}
                  maxLength="4"
                />
              </Col>
            </Row>
            <Row>
              <Col md={4} xs={12}>
                <Input label="Email" id="email" name="household.email" type="email" validator={requiredValidator} />
              </Col>
              <Col md={4} xs={12}>
                <Input
                  label="Preferred Contact Method"
                  name="household.contactMethod"
                  componentClass="select"
                  placeholder="select"
                  validator={requiredValidator}
                >
                  <option value="">Select...</option>
                  <option value="email">Email</option>
                  <option value="text">Text</option>
                  <option value="phone">Phone</option>
                </Input>
              </Col>
              <Col md={4} xs={12}>
                <Input
                  label="Ethnicity"
                  name="household.ethnicity"
                  componentClass="select"
                  placeholder="select"
                  validator={requiredValidator}
                >
                  <option value="">Select...</option>
                  <option value="American Indian or Alaskan Native">American Indian or Alaskan Native</option>
                  <option value="Asian">Asian</option> <option value="African American">African American</option>
                  <option value="Hispanic">Hispanic</option>
                  <option value="Pacific Islander">Pacific Islander</option> <option value="White">White</option>
                  <option value="Other">Other</option>
                </Input>
              </Col>
            </Row>
          </Box>
        </Col>
      </Row>
    </form>
  );
};

export default Form(FormValidation(HouseholdForm));
