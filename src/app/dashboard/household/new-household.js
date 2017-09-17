// @flow
import * as React from 'react';

import HouseholdForm from './components/household-form';
import AddressForm from './components/address-form';
import PhoneNumbers from './components/phone-numbers-form';
import ChildForm from './components/child-form';
import { Row, Col, Button } from 'react-bootstrap';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import { getSchools } from 'api/affiliation';

export default class NewHousehold extends React.Component<{}, {
  household: {},
  address: {},
  nominations: Array<{}>,
  schools: Array<mixed>
}> {
  constructor() {
    super();

    this.state = {
      household: {},
      address: {},
      nominations: [],
      schools: []
    };

    (this: any).onChange = this.onChange.bind(this);
    (this: any).onSubmit = this.onSubmit.bind(this);
  }

  addChild() {
    this.setState(() => {
      return { nominations: this.state.nominations.concat({}) };
    });
  }

  removeChild() {
    const nominations = this.state.nominations.slice();
    nominations.pop();
    this.setState(() => {
      return { nominations };
    });
  }

  componentDidMount() {
    getSchools()
      .then(response => {
        this.setState(() => ({ schools: response.items }));
      })
      .catch(err => {
        console.log(err);
      });
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
    return (
      <div>
        <HouseholdForm data={this.state} getValue={getValue} onChange={this.onChange} onSubmit={this.onSubmit} />
        <AddressForm data={this.state} getValue={getValue} onChange={this.onChange} onSubmit={this.onSubmit} />
        <PhoneNumbers data={this.state} getValue={getValue} onChange={this.onChange} onSubmit={this.onSubmit} />
        <ChildForm
          data={this.state}
          getValue={getValue}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          addChild={this.addChild.bind(this)}
          removeChild={this.removeChild.bind(this)}
          affiliations={this.state.schools}
        />
        <Row>
          <Col xs={12}>
            <Button>Save Draft</Button>
          </Col>
        </Row>
      </div>
    );
  }
}
