// @flow
import * as React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Box from '../../../components/box';
import Input from 'app/components/input';
import requiredValidator from 'lib/validators/required.validator';

type PhoneNumber = {
  // TODO
};

class PhoneNumbersForm extends React.Component<{
  phoneNumbers: PhoneNumber[]
}, {
  phoneNumbers: PhoneNumber[]
}> {

  static defaultProps = { phoneNumbers: [] };

  constructor(props) {
    super(props);

    this.state = { phoneNumbers: props.phoneNumbers };

    console.log(props);
  }

  addPhoneNumber() {
    this.setState(() => {
      return { phoneNumbers: this.state.phoneNumbers.concat({}) };
    });
  }

  removePhoneNumber() {
    const phoneNumbers = this.state.phoneNumbers.slice();
    phoneNumbers.pop();
    this.setState(() => {
      return { phoneNumbers };
    });
  }

  render(): React.Node {
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
                        <Input
                          label="Type"
                          name={`phoneNumbers[${idx}].phoneType`}
                          componentClass="select"
                          placeholder="select"
                          validator={requiredValidator}
                        >
                          <option value="">Select...</option>
                          <option value="home">Home</option>
                          <option value="work">Work</option>
                          <option value="work">Mobile</option>
                        </Input>
                      </Col>
                      <Col md={6} xs={12}>
                        <Input
                          label="Phone"
                          id="phone"
                          name={`phoneNumbers[${idx}].phone`}
                          type="tel"
                          required
                          autoComplete="tel"
                          validator={requiredValidator}
                        />
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

export default PhoneNumbersForm;
