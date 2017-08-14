// @flow
import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button, Checkbox } from 'react-bootstrap';
import Box from '../../components/box';

export default class ChildForm extends Component {
  constructor() {
    super();

    this.state = {
      childNominations: [{}]
    };
  }

  addChild() {
    this.setState(() => {
      return {
        childNominations: this.state.childNominations.concat({})
      };
    });
  }

  removeChild() {
    let childNominations = this.state.childNominations.slice();
    childNominations.pop();
    this.setState(() => {
      return {
        childNominations
      };
    });
  }

  render() {
    return (
      <div>
        {this.state.childNominations.map((row, idx) => {
          return (
            <Row key={`childNomination${idx}`}>
              <Col xs={12}>
                <Box title={`Child #${idx + 1}`}>
                  <Row>
                    <Col md={6} xs={12}>
                      <FormGroup>
                        <ControlLabel htmlFor="firstName">First Name</ControlLabel>
                        <FormControl name={`nomination[${idx}].firstName`} id="firstName" type="text" required />
                      </FormGroup>
                    </Col>
                    <Col md={6} xs={12}>
                      <FormGroup>
                        <ControlLabel htmlFor="lastName">Last Name</ControlLabel>
                        <FormControl name={`nomination[${idx}].lastName`} id="lastName" type="text" required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={3} xs={12}>
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Gender</ControlLabel>
                        <FormControl
                          name={`nomination[${idx}].gender`}
                          componentClass="select"
                          placeholder="select"
                          required>
                          <option value="select">Select...</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </FormControl>
                      </FormGroup>
                    </Col>
                    <Col md={3} xs={12}>
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Ethnicity</ControlLabel>
                        <FormControl
                          name={`nomination[${idx}].ethnicity`}
                          componentClass="select"
                          placeholder="select"
                          required>
                          <option value="">Select...</option>
                          <option value="American Indian or Alaskan Native">American Indian or Alaskan Native</option>
                          <option value="Asian">Asian</option>{' '}
                          <option value="African American">African American</option>
                          <option value="Hispanic">Hispanic</option>
                          <option value="Pacific Islander">Pacific Islander</option>{' '}
                          <option value="White">White</option>
                          <option value="Other">Other</option>
                        </FormControl>
                      </FormGroup>
                    </Col>
                    <Col md={3} xs={12}>
                      <FormGroup>
                        <ControlLabel>Last four digits of SSN</ControlLabel>
                        <FormControl
                          name={`nomination[${idx}].ssn`}
                          type="text"
                          pattern="[0-9]{4}"
                          required
                          maxLength="4"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3} xs={12}>
                      <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Child receives free or reduced lunch?</ControlLabel>
                        <FormControl
                          name={`nomination[${idx}].receivesLunch`}
                          componentClass="select"
                          placeholder="select"
                          required>
                          <option value="">Select...</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </FormControl>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} xs={12}>
                      <FormGroup>
                        <ControlLabel>Date of Birth</ControlLabel>
                        <FormControl name={`nomination[${idx}].dob`} type="date" required />
                      </FormGroup>
                    </Col>
                    <Col md={6} xs={12}>
                      <FormGroup>
                        <ControlLabel>School Name</ControlLabel>
                        <FormControl name={`nomination[${idx}].schoolName`} type="text" required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Checkbox name={`nomination[${idx}].wantsBike`}>Child wants bike?</Checkbox>
                    </Col>
                    <Col xs={12}>
                      <Checkbox name={`nomination[${idx}].wantsClothes`}>Child wants clothes?</Checkbox>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <FormGroup>
                        <ControlLabel>Favorite Color</ControlLabel>
                        <FormControl name={`nomination[${idx}].favoriteColor`} type="text" required />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} xs={12}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Child's Interests</ControlLabel>
                        <FormControl name={`nomination[${idx}].interests`} componentClass="textarea" placeholder="" />
                      </FormGroup>
                    </Col>
                    <Col md={4} xs={12}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Additional Ideas</ControlLabel>
                        <FormControl name={`nomination[${idx}].additionalIdeas`} componentClass="textarea" />
                      </FormGroup>
                    </Col>
                    <Col md={4} xs={12}>
                      <FormGroup controlId="formControlsTextarea">
                        <ControlLabel>Reason for nomination</ControlLabel>
                        <FormControl name={`nomination[${idx}].nominationReason`} componentClass="textarea" />
                      </FormGroup>
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
      </div>
    );
  }
}
