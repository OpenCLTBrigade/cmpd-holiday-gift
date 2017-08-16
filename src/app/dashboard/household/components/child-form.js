// @flow
import React, { Component } from 'react';
import { Row, Col, FormGroup, ControlLabel, Button, Checkbox } from 'react-bootstrap';
import Box from '../../components/box';
import { FormValidation } from 'neoform-validation';
import { Form } from 'neoform';
import Input from './form/input';
import requiredValidator from '../validators/required.validator';

class ChildForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nominations: props.data.nominations || []
    };
  }

  addChild() {
    this.setState(() => {
      return {
        nominations: this.state.nominations.concat({})
      };
    });
  }

  removeChild() {
    let nominations = this.state.nominations.slice();
    nominations.pop();
    this.setState(() => {
      return {
        nominations
      };
    });
  }

  render() {
    const { onSubmit, validate, onInvalid } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          validate(onSubmit, onInvalid);
        }}
      >
        {this.state.nominations.map((row, idx) => {
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
                        validator={requiredValidator}
                      >
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
                        validator={requiredValidator}
                      >
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
                      <Checkbox name={`nominations[${idx}].wantsBike`}>Child wants bike?</Checkbox>
                    </Col>
                    <Col xs={12}>
                      <Checkbox name={`nominations[${idx}].wantsClothes`}>Child wants clothes?</Checkbox>
                    </Col>
                  </Row>
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
                      <Button bsStyle="danger" onClick={() => this.removeChild()}>
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
              <Button onClick={() => this.addChild()}>Add Child</Button>
            </Box>
          </Col>
        </Row>
      </form>
    );
  }
}

export default Form(FormValidation(ChildForm));
