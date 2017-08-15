// @flow
import React from 'react';
import { Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import Box from '../../components/box';
import Input from './form/input';
import { Form } from 'neoform';

const HouseholdForm = ({ data, onSubmit }: { data: any, onSubmit: Function }) => {
  return (
    <form onSubmit={e => onSubmit(e)}>
      <Row>
        <Col xs={12}>
          <Box title="Head of Household Information" bsStyle="primary">
            <Row>
              <Col md={6} xs={12}>
                <FormGroup>
                  <ControlLabel htmlFor="firstName">First Name</ControlLabel>
                  <Input name="household.firstName" id="firstName" type="text" required />
                </FormGroup>
              </Col>
              <Col md={6} xs={12}>
                <FormGroup>
                  <ControlLabel htmlFor="lastName">Last Name</ControlLabel>
                  <Input name="household.lastName" id="lastName" type="text" required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4} xs={12}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Gender</ControlLabel>
                  <Input name="household.gender" componentClass="select" placeholder="select" required>
                    <option value="select">Select...</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4} xs={12}>
                <FormGroup>
                  <ControlLabel htmlFor="dob">Date of Birth</ControlLabel>
                  <Input id="dob" name="household.dob" type="date" required />
                </FormGroup>
              </Col>
              <Col md={4} xs={12}>
                <FormGroup>
                  <ControlLabel htmlFor="ssn">Last four digits of SSN</ControlLabel>
                  <Input id="ssn" name="household.ssn" type="text" pattern="[0-9]{4}" required maxLength="4" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4} xs={12}>
                <FormGroup>
                  <ControlLabel htmlFor="email">Email</ControlLabel>
                  <Input id="email" name="household.email" type="email" required />
                </FormGroup>
              </Col>
              <Col md={4} xs={12}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Preferred Contact Method</ControlLabel>
                  <Input name="household.contactMethod" componentClass="select" placeholder="select" required>
                    <option value="">Select...</option>
                    <option value="email">Email</option>
                    <option value="text">Text</option>
                    <option value="phone">Phone</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4} xs={12}>
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Ethnicity</ControlLabel>
                  <Input name="household.ethnicity" componentClass="select" placeholder="select" required>
                    <option value="">Select...</option>
                    <option value="American Indian or Alaskan Native">American Indian or Alaskan Native</option>
                    <option value="Asian">Asian</option> <option value="African American">African American</option>
                    <option value="Hispanic">Hispanic</option>
                    <option value="Pacific Islander">Pacific Islander</option> <option value="White">White</option>
                    <option value="Other">Other</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Box>
        </Col>
      </Row>
    </form>
  );
};

export default Form(HouseholdForm);
