// @flow
import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { setValue, getValue } from 'neoform-plain-object-helpers';
import UserForm from './components/user-form.js';

export default class NewUser extends Component<any> {

  constructor() {
    super();

    this.state = { user: {} };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(name: string, value: any) {
    this.setState(prevState => {
      let newState = setValue(prevState, name, value);

      return newState;
    });
  }

  onInvalid() {
    console.log('onInvalid');
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <UserForm
            data={this.state}
            getValue={getValue}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}