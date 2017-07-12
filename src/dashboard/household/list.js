import React, { Component } from 'react';
import HouseholdTable from './components/HouseholdTable';

export default class List extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <HouseholdTable />;
  }
}
