// @flow
import * as React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Box from '../../components/box';
import { FormValidation } from 'neoform-validation';
import { Form } from 'neoform';
import Input from './form/input';
import requiredValidator from '../validators/required.validator';
import Checkbox from './form/checkbox';

type NominationType = {
  // TODO
};

const ChildForm = ({ onSubmit, validate, onInvalid, data, addChild, removeChild }) => {
  const { nominations } = data;

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        validate(onSubmit, onInvalid);
      }}>
      {nominations.map((row, idx) => {
        return (
          <Row key={`nominations${idx}`}>
            <Col xs={12}>
              <Box title={`Child #${idx + 1}`} bsStyle="success">
                <Row>
                  <Col md={6} xs={12}>
                    <Input
                      label="First Name"
                      name={`nominations[${idx}].firstName`}
                      id="firstName"
                      type="text"
                      validator={requiredValidator}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Input
                      label="Last Name"
                      name={`nominations[${idx}].lastName`}
                      id="lastName"
                      type="text"
                      validator={requiredValidator}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={3} xs={12}>
                    <Input
                      label="Gender"
                      name={`nominations[${idx}].gender`}
                      componentClass="select"
                      placeholder="select"
                      validator={requiredValidator}>
                      <option value="select">Select...</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </Input>
                  </Col>
                  <Col md={3} xs={12}>
                    <Input
                      label="Ethnicity"
                      name={`nominations[${idx}].ethnicity`}
                      componentClass="select"
                      placeholder="select"
                      validator={requiredValidator}>
                      <option value="">Select...</option>
                      <option value="American Indian or Alaskan Native">American Indian or Alaskan Native</option>
                      <option value="Asian">Asian</option> <option value="African American">African American</option>
                      <option value="Hispanic">Hispanic</option>
                      <option value="Pacific Islander">Pacific Islander</option> <option value="White">White</option>
                      <option value="Other">Other</option>
                    </Input>
                  </Col>
                  <Col md={3} xs={12}>
                    <Input
                      label="Last four digits of SSN"
                      name={`nominations[${idx}].ssn`}
                      type="text"
                      pattern="[0-9]{4}"
                      validator={requiredValidator}
                      maxLength="4"
                    />
                  </Col>
                  <Col md={3} xs={12}>
                    <Input
                      label="Child receives free or reduced lunch?"
                      name={`nominations[${idx}].receivesLunch`}
                      componentClass="select"
                      placeholder="select"
                      validator={requiredValidator}>
                      <option value="">Select...</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Input>
                  </Col>
                </Row>
                <Row>
                  <Col md={6} xs={12}>
                    <Input
                      label="Date of Birth"
                      name={`nominations[${idx}].dob`}
                      type="date"
                      validator={requiredValidator}
                    />
                  </Col>
                  <Col md={6} xs={12}>
                    <Input
                      label="School Name"
                      name={`nominations[${idx}].schoolName`}
                      type="text"
                      validator={requiredValidator}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Checkbox name={`nominations[${idx}].wantsBike`} label="Child wants bike?" />
                  </Col>
                </Row>
                {nominations[idx] &&
                  nominations[idx].wantsBike &&
                  <Row>
                    <Col xs={12}>
                      <Input
                        label="Bike style"
                        name={`nominations[${idx}].bikeStyle`}
                        componentClass="select"
                        placeholder="select"
                        validator={requiredValidator}>
                        <option value="select">Select...</option>
                        <option value="Trycicle">Tricycle</option>
                        <option value="Mountain">Mountain bike</option>
                        <option value="BMX">BMX bike</option>
                      </Input>
                    </Col>
                    <Col xs={12}>
                      <Input
                        label="Bike size"
                        name={`nominations[${idx}].bikeSize`}
                        componentClass="select"
                        placeholder="select"
                        validator={requiredValidator}>
                        <option value="select">Select...</option>
                        <option value="Trycicle">Tricycle</option>
                        <option value="12&quot; bicycle">12" bicycle</option>
                        <option value="16&quot; bicycle">16" bicycle</option>
                        <option value="20&quot; coaster brake bicycle">20" coaster brake bicycle</option>
                        <option value="20&quot; geared bicycle">20" geared bicycle</option>
                        <option value="24&quot; geared bicycle">24" geared bicycle</option>
                      </Input>
                    </Col>
                  </Row>}
                <Row>
                  <Col xs={12}>
                    <Checkbox name={`nominations[${idx}].wantsClothes`} label="Child wants clothes?" />
                  </Col>
                </Row>
                {nominations[idx] &&
                  nominations[idx].wantsClothes &&
                  <Row>
                    <Col xs={12}>
                      <Input label="Shirt size" name={`nominations[${idx}].shirtSize`} />
                    </Col>
                    <Col xs={12}>
                      <Input label="Pant size" name={`nominations[${idx}].pantSize`} />
                    </Col>
                    <Col xs={12}>
                      <Input label="Shoe size" name={`nominations[${idx}].shoeSize`} />
                    </Col>
                  </Row>}
                <Row>
                  <Col xs={12}>
                    <Input
                      label="Favorite Color"
                      name={`nominations[${idx}].favoriteColor`}
                      type="text"
                      validator={requiredValidator}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={4} xs={12}>
                    <Input
                      label="Child's Interests"
                      name={`nominations[${idx}].interests`}
                      componentClass="textarea"
                      placeholder=""
                    />
                  </Col>
                  <Col md={4} xs={12}>
                    <Input
                      label="Additional Ideas"
                      name={`nominations[${idx}].additionalIdeas`}
                      componentClass="textarea"
                    />
                  </Col>
                  <Col md={4} xs={12}>
                    <Input
                      label="Reason for nomination"
                      name={`nominations[${idx}].nominationReason`}
                      componentClass="textarea"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <Button bsStyle="danger" onClick={() => removeChild()}>
                      Remove Child
                    </Button>
                  </Col>
                </Row>
              </Box>
            </Col>
          </Row>
        );
      })}

      <Row>
        <Col xs={12}>
          <Box>
            <Button onClick={() => addChild()}>Add Child</Button>
          </Box>
        </Col>
      </Row>
    </form>
  );
};

export default Form(FormValidation(ChildForm));
