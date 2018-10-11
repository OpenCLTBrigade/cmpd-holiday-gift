import * as React from 'react';
import { Row, Col } from 'react-bootstrap';

import Box from '../../../components/box';
import requiredValidator from '../../../../../lib/validators/required.validator';
import FormField from '../../../../components/form/FormField';
import { path } from 'rambda';

class AddressForm extends React.Component {
  constructor() {
    super();
    this.addressRefs = {};
  }

  componentDidMount() {
    const { onChange } = this.props;
    console.log(this.placesRef);
    var placesAutocomplete = places({
      container: this.placesRef,
      type: 'address',
      templates: {
        value(suggestion) {
          return suggestion.name;
        }
      }
    });

    placesAutocomplete.on('change', e => {
      console.log('Selected address', e.suggestion);
      const { name: street, administrative: state, city, postcode: zip, latlng } = e.suggestion;
      //   onChange({ street, state, city, zip, latlng });
      onChange({ street, state, city, latlng }); // Removed ZIP because Places is not returning correct value
    });
  }

  render() {
    const { user } = this.props;
    const isAdmin = path('claims.nominations.admin', user);

    return (
      <div>
        <Row>
          <Col xs={12}>
            <Box title="Delivery Address" bsStyle="danger">
              <Row>
                <Col md={4} xs={12}>
                  <FormField
                    label="Type"
                    controlId="formControlsSelect"
                    name="address.type"
                    componentClass="select"
                    placeholder="select"
                    required>
                    <option value="">Select...</option>
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                  </FormField>
                </Col>
                <Col md={4} xs={12}>
                  <FormField
                    label="Street Address"
                    id="streetAddress"
                    name="address.street"
                    type="search"
                    inputRef={input => (this.placesRef = input)}
                    required
                    autoComplete="shipping address-line1"
                  />
                </Col>
                <Col md={4} xs={12}>
                  <FormField
                    label="Street Address 2"
                    id="streetAddress"
                    name="address.street2"
                    type="text"
                    ref={FormField => (this.addressRefs.address2 = FormField)}
                    autoComplete="shipping address-line2"
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4} xs={12}>
                  <FormField
                    label="City"
                    id="city"
                    name="address.city"
                    type="text"
                    required
                    autoComplete="shipping locality city"
                    ref={el => (this.addressRefs.city = el)}
                  />
                </Col>
                <Col md={4} xs={12}>
                  <FormField
                    label="State"
                    id="state"
                    name="address.state"
                    type="text"
                    required
                    autoComplete="shipping region state"
                    ref={el => (this.addressRefs.state = el)}
                  />
                </Col>
                <Col md={4} xs={12}>
                  <FormField
                    label="Zip Code"
                    id="zip"
                    name="address.zip"
                    type="text"
                    required
                    pattern="(\d{5}([\-]\d{4})?)"
                    maxLength="5"
                    autoComplete="shipping postal-code"
                    ref={el => (this.addressRefs.zip = el)}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6} xs={12}>
                  <FormField label="CMPD Division" name="address.cmpdDivision" type="text" disabled={!isAdmin} />
                </Col>
                <Col md={6} xs={12}>
                  <FormField
                    label="CMPD Response Area"
                    name="address.cmpdResponseArea"
                    type="text"
                    disabled={!isAdmin}
                  />
                </Col>
              </Row>
            </Box>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddressForm;
