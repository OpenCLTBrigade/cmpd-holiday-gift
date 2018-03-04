import * as React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Box from '../../../components/box';
import requiredValidator from '../../../../../lib/validators/required.validator';
import FormField from '../../../../components/form/FormField';
import { FieldArray } from 'react-final-form-arrays';

// type PhoneNumber = {
//     // TODO
// }

class PhoneNumbersForm extends React.PureComponent {
  static defaultProps = { phoneNumbers: [] };

  render() {
    const { phoneNumbers, removePhoneNumber, addPhoneNumber } = this.props;

    return (
      <div>
        <Row>
          <Col xs={12}>
            <Box title="Phone Numbers" bsStyle="danger">
              <FieldArray name="phoneNumbers">
                {({ fields }) => {
                  return (
                    <div>
                      {fields.map((name, idx) => {
                        return (
                          <Row key={name}>
                            <Col md={6} xs={12}>
                              <FormField
                                label="Type"
                                name={`${name}.type`}
                                componentClass="select"
                                placeholder="select"
                                required>
                                <option value="">Select...</option>
                                <option value="home">Home</option>
                                <option value="work">Work</option>
                                <option value="mobile">Mobile</option>
                              </FormField>
                            </Col>
                            <Col md={6} xs={12}>
                              <FormField
                                label="Phone"
                                id="phone"
                                name={`${name}.number`}
                                type="tel"
                                required
                                autoComplete="tel"
                                required
                              />
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
