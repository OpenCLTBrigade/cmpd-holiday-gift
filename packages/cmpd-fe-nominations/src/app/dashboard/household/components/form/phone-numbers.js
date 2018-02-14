// @flow
import * as React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Box from '../../../components/box';
import Input from 'app/components/input';
import requiredValidator from 'lib/validators/required.validator';

type PhoneNumber = {
    // TODO
}

class PhoneNumbersForm extends React.PureComponent<
    {
        phoneNumbers: PhoneNumber[]
    },
    null
> {
  static defaultProps = { phoneNumbers: [] }

  render(): React.Node {
    const { phoneNumbers, removePhoneNumber, addPhoneNumber } = this.props;

    return (
            <div>
                <Row>
                    <Col xs={12}>
                        <Box title="Phone Numbers" bsStyle="danger">
                            {phoneNumbers &&
                                phoneNumbers.map((phoneNumber, idx) => {
                                  return (
                                        <Row key={`phoneNumber-${idx}`}>
                                            <Col md={6} xs={12}>
                                                <Input
                                                    label="Type"
                                                    name={`phoneNumbers[${idx}].type`}
                                                    componentClass="select"
                                                    placeholder="select"
                                                    validator={requiredValidator}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="home">Home</option>
                                                    <option value="work">Work</option>
                                                    <option value="mobile">Mobile</option>
                                                </Input>
                                            </Col>
                                            <Col md={6} xs={12}>
                                                <Input
                                                    label="Phone"
                                                    id="phone"
                                                    name={`phoneNumbers[${idx}].number`}
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
                                    <Button onClick={() => addPhoneNumber()}>Add Phone</Button>
                                    <span> </span>
                                    <Button bsStyle="danger" onClick={() => removePhoneNumber()}>
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
