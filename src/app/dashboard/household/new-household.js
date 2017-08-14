// @flow
import React, { Component } from 'react';

import HeadOfHousehold from './components/household-form';
import DeliveryAddresss from './components/address-form';
import PhoneNumbers from './components/phone-numbers-form';
export default class NewHousehold extends Component {
  render() {
    return (
      <div>
        <HeadOfHousehold />
        <DeliveryAddresss />
        <PhoneNumbers />
      </div>
    );
  }
}
