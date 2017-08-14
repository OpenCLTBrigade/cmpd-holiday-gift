// @flow
import React, { Component } from 'react';
import { Row, Col, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Box from '../../components/box';

export default class AddressForm extends Component {
  constructor(props = { phoneNumbers: [] }) {
    super(props);

    this.state = {
      phoneNumbers: props.phoneNumbers || []
    };

    console.log(props);
  }

  addPhoneNumber() {
    this.setState(() => {
      return {
        phoneNumbers: this.state.phoneNumbers.concat({})
      };
    });
  }

  removePhoneNumber() {
    let phoneNumbers = this.state.phoneNumbers.slice();
    phoneNumbers.pop();
    this.setState(() => {
      return {
        phoneNumbers
      };
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <Box title="Phone Numbers" bsStyle="danger">
              {this.state.phoneNumbers &&
                this.state.phoneNumbers.map((phoneNumber, idx) => {
                  return (
                    <Row key={`phoneNumber-${idx}`}>
                      <Col md={6} xs={12}>
                        <FormGroup controlId="formControlsSelect">
                          <ControlLabel>Type</ControlLabel>
                          <FormControl name="phoneType" componentClass="select" placeholder="select" required>
                            <option value="select">Select...</option>
                            <option value="home">Home</option>
                            <option value="work">Work</option>
                            <option value="work">Mobile</option>
                          </FormControl>
                        </FormGroup>
                      </Col>
                      <Col md={6} xs={12}>
                        <FormGroup>
                          <ControlLabel htmlFor="phone">Phone</ControlLabel>
                          <FormControl id="phone" name="phone" type="tel" required autoComplete="tel" />
                        </FormGroup>
                      </Col>
                    </Row>
                  );
                })}

              <Row>
                <Col xs={12}>
                  <Button onClick={() => this.addPhoneNumber()}>Add Phone</Button>
                  <span> </span>
                  <Button bsStyle="danger" onClick={() => this.removePhoneNumber()}>
                    Remove Phone
                  </Button>
                </Col>
              </Row>
            </Box>
          </Col>
        </Row>
      </div>
    );
  }
}
