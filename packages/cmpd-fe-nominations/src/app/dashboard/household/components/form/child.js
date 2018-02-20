import * as React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Box from '../../../components/box';
import Input from '../../../../../app/components/input';
import requiredValidator from '../../../../../lib/validators/required.validator';
import Checkbox from './checkbox';
import { bikeSizeMap } from '../../../../../lib/constants/bike-size';

const ChildForm = ({ childNominations, addChild, removeChild, affiliations }) => {
  return (
    <div>
      {childNominations &&
        childNominations.map((row, idx) => {
          return (
            <Row key={`children${idx}`}>
              <Col xs={12}>
                <Box title={`Child #${idx + 1}`} bsStyle="success">
                  <Row>
                    <Col md={6} xs={12}>
                      <Input
                        label="First Name"
                        name={`children[${idx}].firstName`}
                        id="firstName"
                        type="text"
                        validator={requiredValidator}
                      />
                    </Col>
                    <Col md={6} xs={12}>
                      <Input
                        label="Last Name"
                        name={`children[${idx}].lastName`}
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
                        name={`children[${idx}].gender`}
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
                        name={`children[${idx}].race`}
                        componentClass="select"
                        placeholder="select"
                        validator={requiredValidator}>
                        <option value="">Select...</option>
                        <option value="American Indian or Alaskan Native">American Indian or Alaskan Native</option>
                        <option value="Asian">Asian</option> <option value="African American">African American</option>
                        <option value="Hispanic">Hispanic</option>
                        <option value="Pacific Islander">Pacific Islander</option> <option value="White">White</option>
                        <option value="Not Given">Not Given</option>
                        <option value="Other">Other</option>
                      </Input>
                    </Col>
                    <Col md={3} xs={12}>
                      <Input
                        label="Last four digits of SSN"
                        name={`children[${idx}].last4ssn`}
                        type="text"
                        pattern="[0-9]{4}"
                        validator={requiredValidator}
                        maxLength="4"
                      />
                    </Col>
                    <Col md={3} xs={12}>
                      <Input
                        label="Child receives free or reduced lunch?"
                        name={`children[${idx}].freeOrReducedLunch`}
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
                        name={`children[${idx}].dob`}
                        type="date"
                        validator={requiredValidator}
                      />
                    </Col>
                    <Col md={6} xs={12}>
                      <Input
                        label="School Name"
                        name={`children[${idx}].schoolId`}
                        componentClass="select"
                        validator={requiredValidator}>
                        <option value="">Select...</option>
                        {affiliations &&
                          affiliations.map((affiliation, idx) => (
                            <option key={`affiliation-${idx}`} value={affiliation.id}>
                              {affiliation.name}
                            </option>
                          ))}
                      </Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Checkbox name={`children[${idx}].wantsBike`} label="Child wants bike?" />
                    </Col>
                  </Row>
                  {childNominations[idx] &&
                    childNominations[idx].wantsBike && (
                      <Row>
                        <Col xs={12}>
                          <Input
                            label="Bike style"
                            name={`children[${idx}].bikeStyle`}
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
                            name={`children[${idx}].bikeSize`}
                            componentClass="select"
                            placeholder="select"
                            validator={requiredValidator}>
                            <option value="select">Select...</option>

                            {Object.entries(bikeSizeMap).map(([name, desc]) => (
                              <option key={name} value={name}>
                                {desc}
                              </option>
                            ))}
                          </Input>
                        </Col>
                      </Row>
                    )}
                  <Row>
                    <Col xs={12}>
                      <Checkbox name={`children[${idx}].wantsClothes`} label="Child wants clothes?" />
                    </Col>
                  </Row>
                  {childNominations[idx] &&
                    childNominations[idx].wantsClothes && (
                      <Row>
                        <Col xs={12}>
                          <Input label="Shirt size" name={`children[${idx}].clothesShirtSize`} />
                        </Col>
                        <Col xs={12}>
                          <Input label="Pant size" name={`children[${idx}].clothesPantsSize`} />
                        </Col>
                        <Col xs={12}>
                          <Input label="Coat size" name={`children[${idx}].clothesCoatSize`} />
                        </Col>
                        <Col xs={12}>
                          <Input label="Shoe size" name={`children[${idx}].shoeSize`} />
                        </Col>
                      </Row>
                    )}
                  <Row>
                    <Col xs={12}>
                      <Input label="Favorite Color" name={`children[${idx}].favouriteColor`} type="text" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} xs={12}>
                      <Input
                        label="Child's Interests"
                        name={`children[${idx}].interests`}
                        componentClass="textarea"
                        placeholder=""
                      />
                    </Col>
                    <Col md={4} xs={12}>
                      <Input
                        label="Additional Ideas"
                        name={`children[${idx}].additionalIdeas`}
                        componentClass="textarea"
                      />
                    </Col>
                    <Col md={4} xs={12}>
                      <Input
                        label="Reason for nomination"
                        name={`children[${idx}].reasonForNomination`}
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
    </div>
  );
};

export default ChildForm;
