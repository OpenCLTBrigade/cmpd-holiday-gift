import * as React from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import Box from '../../../components/box';
import requiredValidator from '../../../../../lib/validators/required.validator';
import { bikeSizeMap } from '../../../../../lib/constants/bike-size';
import FormField from '../../../../components/form/FormField';
import { FieldArray } from 'react-final-form-arrays';
import { pathOr } from 'rambda';
import moment from 'moment';

const bool = (myValue = '') => myValue.toLowerCase() == 'true';
const warningAge = 14;

const ChildForm = ({ childNominations, addChild, removeChild, affiliations }) => {
  return (
    <div>
      <FieldArray name="childNominations">
        {({ fields, ...rest }) => {
          return (
            <div>
              {fields.map((name, idx) => {
                const dob = pathOr(new Date(), 'dob', fields.value[idx]);
                const isTooOld = moment(dob).diff(moment().subtract(warningAge, 'years'), 'years') <= 0;

                return (
                  <Row key={name}>
                    <Col xs={12}>
                      <Box title={`Child #${idx + 1}`} bsStyle="success">
                        <Row>
                          {isTooOld && (
                            <Col xs={12}>
                              <Alert bsStyle="warning" key={name}>
                                <strong>Warning!</strong> This child is over the age of {warningAge}.
                              </Alert>
                            </Col>
                          )}
                          <Col md={6} xs={12}>
                            <FormField
                              label="First Name"
                              name={`${name}.firstName`}
                              id="firstName"
                              type="text"
                              required
                            />
                          </Col>
                          <Col md={6} xs={12}>
                            <FormField label="Last Name" name={`${name}.lastName`} id="lastName" type="text" required />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={3} xs={12}>
                            <FormField
                              label="Gender"
                              name={`${name}.gender`}
                              componentClass="select"
                              placeholder="select"
                              required>
                              <option value="select">Select...</option>
                              <option value="M">Male</option>
                              <option value="F">Female</option>
                            </FormField>
                          </Col>
                          <Col md={3} xs={12}>
                            <FormField
                              label="Ethnicity"
                              name={`${name}.race`}
                              componentClass="select"
                              placeholder="select"
                              required>
                              <option value="">Select...</option>
                              <option value="American Indian or Alaskan Native">
                                American Indian or Alaskan Native
                              </option>
                              <option value="Asian">Asian</option>{' '}
                              <option value="African American">African American</option>
                              <option value="Hispanic">Hispanic</option>
                              <option value="Pacific Islander">Pacific Islander</option>{' '}
                              <option value="White">White</option>
                              <option value="Not Given">Not Given</option>
                              <option value="Other">Other</option>
                            </FormField>
                          </Col>
                          <Col md={3} xs={12}>
                            <FormField
                              label="Last four digits of SSN"
                              name={`${name}.last4ssn`}
                              type="text"
                              pattern="[0-9]{4}"
                              required
                              maxLength="4"
                            />
                          </Col>
                          <Col md={3} xs={12}>
                            <FormField
                              label="Child receives free or reduced lunch?"
                              name={`${name}.freeOrReducedLunch`}
                              componentClass="select"
                              placeholder="select"
                              required>
                              <option value="">Select...</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                            </FormField>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} xs={12}>
                            <FormField label="Date of Birth" name={`${name}.dob`} type="date" required />
                          </Col>
                          <Col md={6} xs={12}>
                            <FormField label="School Name" name={`${name}.schoolId`} componentClass="select" required>
                              <option value="">Select...</option>
                              {affiliations &&
                                affiliations.map((affiliation, idx) => (
                                  <option key={`affiliation-${idx}`} value={affiliation.id}>
                                    {affiliation.name}
                                  </option>
                                ))}
                            </FormField>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={6}>
                            <FormField
                              label="Child wants bike?"
                              name={`${name}.wantsBike`}
                              componentClass="select"
                              placeholder="select"
                              parse={value => bool(value)}
                              required>
                              <option>Select...</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </FormField>
                          </Col>
                        </Row>
                        {childNominations[idx] &&
                          childNominations[idx].wantsBike && (
                            <Row>
                              <Col xs={12}>
                                <FormField
                                  label="Bike style"
                                  name={`${name}.bikeStyle`}
                                  componentClass="select"
                                  placeholder="select"
                                  required>
                                  <option value="select">Select...</option>
                                  <option value="Trycicle">Tricycle</option>
                                  <option value="Mountain">Mountain bike</option>
                                  <option value="BMX">BMX bike</option>
                                </FormField>
                              </Col>
                              <Col xs={12}>
                                <FormField
                                  label="Bike size"
                                  name={`${name}.bikeSize`}
                                  componentClass="select"
                                  placeholder="select"
                                  required>
                                  <option value="select">Select...</option>

                                  {Object.entries(bikeSizeMap).map(([name, desc]) => (
                                    <option key={name} value={name}>
                                      {desc}
                                    </option>
                                  ))}
                                </FormField>
                              </Col>
                            </Row>
                          )}
                        <Row>
                          <Col xs={6}>
                            <FormField
                              label="Child wants clothes?"
                              name={`${name}.wantsClothes`}
                              componentClass="select"
                              placeholder="select"
                              parse={value => bool(value)}
                              required>
                              <option>Select...</option>
                              <option value={true}>Yes</option>
                              <option value={false}>No</option>
                            </FormField>
                          </Col>
                        </Row>
                        {childNominations[idx] &&
                          childNominations[idx].wantsClothes && (
                            <Row>
                              <Col xs={12}>
                                <FormField label="Shirt size" name={`${name}.clothesShirtSize`} />
                              </Col>
                              <Col xs={12}>
                                <FormField label="Pant size" name={`${name}.clothesPantsSize`} />
                              </Col>
                              <Col xs={12}>
                                <FormField label="Coat size" name={`${name}.clothesCoatSize`} />
                              </Col>
                              <Col xs={12}>
                                <FormField label="Shoe size" name={`${name}.shoeSize`} />
                              </Col>
                            </Row>
                          )}
                        <Row>
                          <Col xs={12}>
                            <FormField label="Favorite Color" name={`${name}.favouriteColor`} type="text" />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={4} xs={12}>
                            <FormField
                              label="Child's Interests"
                              name={`${name}.interests`}
                              componentClass="textarea"
                              placeholder=""
                            />
                          </Col>
                          <Col md={4} xs={12}>
                            <FormField
                              label="Additional Ideas"
                              name={`${name}.additionalIdeas`}
                              componentClass="textarea"
                            />
                          </Col>
                          <Col md={4} xs={12}>
                            <FormField
                              label="Reason for nomination"
                              name={`${name}.reasonForNomination`}
                              componentClass="textarea"
                              required
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xs={12}>
                            <Button bsStyle="danger" onClick={() => removeChild(idx)}>
                              Remove Child
                            </Button>
                          </Col>
                        </Row>
                      </Box>
                    </Col>
                  </Row>
                );
              })}
            </div>
          );
        }}
      </FieldArray>

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
