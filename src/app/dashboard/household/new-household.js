// @flow
import * as React from 'react';

import HouseholdForm from './components/household-form';
import AddressForm from './components/address-form';
import PhoneNumbers from './components/phone-numbers-form';
import ChildForm from './components/child-form';
import { Row, Col, Button } from 'react-bootstrap';
import { setValue, getValue } from 'neoform-plain-object-helpers';

export default class NewHousehold extends React.Component<any, any> {
  static defaultProps: any;
  constructor() {
    super();

    this.state = {
      household: {},
      address: {},
      nominations: []
    };

    (this: any).onChange = this.onChange.bind(this);
    (this: any).onSubmit = this.onSubmit.bind(this);
  }

  onChange(name: string, value: any) {
    this.setState(prevState => {
      const newState = setValue(prevState, name, value);

      return newState;
    });
  }

  onInvalid() {
    console.log('onInvalid');
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log(this.state);
  }

  render(): React.Node {
    console.log(this.state);

    return (
      <div>
        <HouseholdForm data={this.state} getValue={getValue} onChange={this.onChange} onSubmit={this.onSubmit} />
        <AddressForm data={this.state} getValue={getValue} onChange={this.onChange} onSubmit={this.onSubmit} />
        <PhoneNumbers data={this.state} getValue={getValue} onChange={this.onChange} onSubmit={this.onSubmit} />
        <ChildForm data={this.state} getValue={getValue} onChange={this.onChange} onSubmit={this.onSubmit} />
        <Row>
          <Col xs={12}>
            <Button>Save Draft</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
