// @flow
import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import Box from '../../components/box';
import Input from './form/input';
import { Form } from 'neoform';
import { FormValidation } from 'neoform-validation';
import requiredValidator from '../validators/required.validator';

const UserForm = ({ onSubmit, validate, onInvalid }) => {
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        validate(onSubmit, onInvalid);
      }}
    >
      <Row>
        <Col xs={12}>
          <Box bsStyle="primary">
            <Row>
              <Col md={12}>
                <p>Note: After creating a new user they will need to be activated from the pending registrations screen.</p>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="First Name"
                  name="user.firstName"
                  id="firstName"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="Last Name"
                  name="user.lastName"
                  id="lastName"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="Affilation"
                  name="user.affilaiton"
                  id="affilation"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="Rank / Position"
                  name="user.rank"
                  id="rank"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="Access Level"
                  name="user.accessLevel"
                  id="accessLevel"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="Nomiation Limit(Yearly)"
                  name="user.nominationLimit"
                  id="nominationLimit"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="Phone Number"
                  name="user.phoneNumber"
                  id="phoneNumber"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="Email"
                  name="user.email"
                  id="email"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="Confirmed Email Address"
                  name="user.emailConformation"
                  id="emailConformation"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="Account Enabled"
                  name="user.enabled"
                  id="enabled"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="Password"
                  name="user.password"
                  id="password"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  label="Password Confirmation"
                  name="user.passwordConfirmation"
                  id="passwordConfirmation"
                  type="text"
                  validator={requiredValidator}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button bsStyle="info">Save</Button>
                <span>  </span>
                <Button bsStyle="warning">Reset</Button>
              </Col>
            </Row>
          </Box>
        </Col>
      </Row>
    </form>
  );
};

export default Form(FormValidation(UserForm));
