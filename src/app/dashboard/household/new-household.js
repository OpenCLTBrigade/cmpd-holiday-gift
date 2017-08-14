// @flow
import React, { Component } from 'react';

import HeadOfHousehold from './components/household-form';
import DeliveryAddresss from './components/address-form';
import PhoneNumbers from './components/phone-numbers-form';
import ChildForm from './components/child-form';
export default class NewHousehold extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <HeadOfHousehold />
        <DeliveryAddresss />
        <PhoneNumbers />
        <ChildForm />
      </div>
    );
  }
}
