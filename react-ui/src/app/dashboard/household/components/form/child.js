// @flow
import * as React from "react";
import { Row, Col, Button, Alert } from "react-bootstrap";
import Box from "../../../components/box";
import Input from "app/components/input";
import requiredValidator from "lib/validators/required.validator";
import Checkbox from "./checkbox";
import { bikeSizeMap } from "lib/constants/bike-size";
import { pathOr } from "ramda";
import moment from "moment";

const warningAge = 14;

const ChildForm = ({ nominations, addChild, removeChild, affiliations }) => {
  return (
    <div>
      {nominations &&
        nominations.map((row, idx) => {
          const dob = pathOr(new Date(), "dob", fields.value[idx]);
          const isTooOld =
            moment(dob).diff(
              moment("Dec 25", "MMM DD").subtract(warningAge, "years"),
              "days"
            ) <= 0;

          return (
            <Row key={`nominations${idx}`}>
              <Col xs={12}>
                <Box title={`Child #${idx + 1}`} bsStyle="success">
                  <Row>
                    {isTooOld && (
                      <Col xs={12}>
                        <Alert bsStyle="warning" key={name}>
                          <strong>Warning!</strong> This child is over the age
                          of {warningAge}.
                        </Alert>
                      </Col>
                    )}
                    <Col md={6} xs={12}>
                      <Input
                        label="First Name"
                        name={`nominations[${idx}].name_first`}
                        id="firstName"
                        type="text"
                        validator={requiredValidator}
                      />
                    </Col>
                    <Col md={6} xs={12}>
                      <Input
                        label="Last Name"
                        name={`nominations[${idx}].name_last`}
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
                        name={`nominations[${idx}].race`}
                        componentClass="select"
                        placeholder="select"
                        validator={requiredValidator}
                      >
                        <option value="">Select...</option>
                        <option value="American Indian or Alaskan Native">
                          American Indian or Alaskan Native
                        </option>
                        <option value="Asian">Asian</option>{" "}
                        <option value="African American">
                          African American
                        </option>
                        <option value="Hispanic">Hispanic</option>
                        <option value="Pacific Islander">
                          Pacific Islander
                        </option>{" "}
                        <option value="White">White</option>
                        <option value="Not Given">Not Given</option>
                        <option value="Other">Other</option>
                      </Input>
                    </Col>
                    <Col md={3} xs={12}>
                      <Input
                        label="Last four digits of SSN"
                        name={`nominations[${idx}].last4ssn`}
                        type="text"
                        pattern="[0-9]{4}"
                        validator={requiredValidator}
                        maxLength="4"
                      />
                    </Col>
                    <Col md={3} xs={12}>
                      <Input
                        label="Child receives free or reduced lunch?"
                        name={`nominations[${idx}].free_or_reduced_lunch`}
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
                        name={`nominations[${idx}].school_id`}
                        componentClass="select"
                        validator={requiredValidator}
                      >
                        <option value="">Select...</option>
                        {affiliations &&
                          affiliations.map((affiliation, idx) => (
                            <option
                              key={`affiliation-${idx}`}
                              value={affiliation.id}
                            >
                              {affiliation.name}
                            </option>
                          ))}
                      </Input>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <Checkbox
                        name={`nominations[${idx}].bike_want`}
                        label="Child wants bike?"
                      />
                    </Col>
                  </Row>
                  {nominations[idx] &&
                    nominations[idx].bike_want && (
                      <Row>
                        <Col xs={12}>
                          <Input
                            label="Bike style"
                            name={`nominations[${idx}].bike_style`}
                            componentClass="select"
                            placeholder="select"
                            validator={requiredValidator}
                          >
                            <option value="select">Select...</option>
                            <option value="Trycicle">Tricycle</option>
                            <option value="Mountain">Mountain bike</option>
                            <option value="BMX">BMX bike</option>
                          </Input>
                        </Col>
                        <Col xs={12}>
                          <Input
                            label="Bike size"
                            name={`nominations[${idx}].bike_size`}
                            componentClass="select"
                            placeholder="select"
                            validator={requiredValidator}
                          >
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
                      <Checkbox
                        name={`nominations[${idx}].clothes_want`}
                        label="Child wants clothes?"
                      />
                    </Col>
                  </Row>
                  {nominations[idx] &&
                    nominations[idx].clothes_want && (
                      <Row>
                        <Col xs={12}>
                          <Input
                            label="Shirt size"
                            name={`nominations[${idx}].clothes_size_shirt`}
                          />
                        </Col>
                        <Col xs={12}>
                          <Input
                            label="Pant size"
                            name={`nominations[${idx}].clothes_size_pants`}
                          />
                        </Col>
                        <Col xs={12}>
                          <Input
                            label="Coat size"
                            name={`nominations[${idx}].clothes_size_coat`}
                          />
                        </Col>
                        <Col xs={12}>
                          <Input
                            label="Shoe size"
                            name={`nominations[${idx}].shoe_size`}
                          />
                        </Col>
                      </Row>
                    )}
                  <Row>
                    <Col xs={12}>
                      <Input
                        label="Favorite Color"
                        name={`nominations[${idx}].favourite_colour`}
                        type="text"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} xs={12}>
                      <Input
                        label="Child's Interests*"
                        name={`nominations[${idx}].interests`}
                        componentClass="textarea"
                        placeholder=""
                      />
                    </Col>
                    <Col md={4} xs={12}>
                      <Input
                        label="Additional Ideas*"
                        name={`nominations[${idx}].additional_ideas`}
                        componentClass="textarea"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <p>
                        *Limit to toys that are <strong>under</strong> $50.
                      </p>
                    </Col>
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
