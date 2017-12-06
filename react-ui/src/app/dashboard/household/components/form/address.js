// @flow
import * as React from 'react';
import { Row, Col } from 'react-bootstrap';

import Box from '../../../components/box';
import Input from 'app/components/input';
import requiredValidator from 'lib/validators/required.validator';

declare var places;

class AddressForm extends React.Component<{onChange?: any}> {
    placesRef: ?HTMLInputElement
  addressRefs: {
      address2?: ?HTMLInputElement,
        city?: ?HTMLInputElement,
        state?: ?HTMLInputElement,
        zip?: ?HTMLInputElement
    }

  constructor() {
    super();
    this.addressRefs = {};
  }

  componentDidMount() {
    const { onChange } = this.props
    var placesAutocomplete = places({
        container: this.placesRef,
        type: 'address',
        templates: {
          value(suggestion) {
            return suggestion.name;
          }
        }
      });

      placesAutocomplete.on('change', (e) => {
          console.log('Selected address', e.suggestion);
          const { name: street, administrative: state, city, postcode: zip, latlng } = e.suggestion;
        //   onChange({ street, state, city, zip, latlng });
          onChange({ street, state, city, latlng }); // Removed ZIP because Places is not returning correct value
      })
  }

  render(): React.Node {
    return (
            <div>
                <Row>
                    <Col xs={12}>
                        <Box title="Delivery Address" bsStyle="danger">
                            <Row>
                                <Col md={4} xs={12}>
                                    <Input
                                        label="Type"
                                        controlId="formControlsSelect"
                                        name="address.type"
                                        componentClass="select"
                                        placeholder="select"
                                        validator={requiredValidator}>
                                        <option value="">Select...</option>
                                        <option value="home">Home</option>
                                        <option value="work">Work</option>
                                    </Input>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Input
                                        label="Street Address"
                                        id="streetAddress"
                                        name="address.street"
                                        type="search"
                                        inputRef={input => this.placesRef = input}
                                        validator={requiredValidator}
                                        autoComplete="shipping address-line1"
                                    />
                                </Col>
                                <Col md={4} xs={12}>
                                    <Input
                                        label="Street Address 2"
                                        id="streetAddress"
                                        name="address.street2"
                                        type="text"
                                        ref={input => this.addressRefs.address2 = input}
                                        autoComplete="shipping address-line2"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} xs={12}>
                                    <Input
                                        label="City"
                                        id="city"
                                        name="address.city"
                                        type="text"
                                        validator={requiredValidator}
                                        autoComplete="shipping locality city"
                                        ref={el => (this.addressRefs.city = el)}
                                    />
                                </Col>
                                <Col md={4} xs={12}>
                                    <Input
                                        label="State"
                                        id="state"
                                        name="address.state"
                                        type="text"
                                        validator={requiredValidator}
                                        autoComplete="shipping region state"
                                        ref={el => (this.addressRefs.state = el)}
                                    />
                                </Col>
                                <Col md={4} xs={12}>
                                    <Input
                                        label="Zip Code"
                                        id="zip"
                                        name="address.zip"
                                        type="text"
                                        validator={requiredValidator}
                                        pattern="(\d{5}([\-]\d{4})?)"
                                        maxLength="5"
                                        autoComplete="shipping postal-code"
                                        ref={el => (this.addressRefs.zip = el)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} xs={12}>
                                    <Input label="CMPD Division" name="address.cmpd_division" type="text" disabled={this.props.user.role !== 'admin'}/>
                                </Col>
                                <Col md={6} xs={12}>
                                    <Input label="CMPD Response Area" name="address.cmpd_response_area" type="text" disabled={this.props.user.role !== 'admin'} />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Input
                                        label="Note for Delivery"
                                        id="shippingNote"
                                        name="address.shipping_note"
                                        type="textarea"
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
