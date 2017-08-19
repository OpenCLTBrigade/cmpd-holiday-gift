// @flow
import React, { Component } from 'react';
import Input from './form/input';
import requiredValidator from '../validators/required.validator';

export default class SelectList extends Component<*> {
  state: { items: [] };
  
  props: {
    fetch: (number, ?string) => Promise < { items: []} > };

  constructor() {
    super();
    this.state = { items: [] };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(page: number = this.state.page, searchText: string = '') {
    console.log('fetchData', page, searchText);
    this.props.fetch(page, searchText).then(data => {
      console.log('In Fetch:', data.items);
      this.setState({ items: data.items });
    });
  }

  handlePageChange = (page: number) => {
    this.fetchData(page);
  };

  handleSearchChange = (searchText?: string) => {
    console.log('searching for', searchText);
    this.fetchData(this.state.page, searchText);
  };

  render(): React.Element<*> {
    return(
      <Input
        label="Affilation"
        name="user.affilaiton"
        componentClass="select"
        validator={requiredValidator}
      >
        {this.state.items.map(function(item){
          return (
            <option key={item.id} value={item.id}>{item.type.toUpperCase()} - {item.name}</option>
          );
        })}  
      </Input>
    )
  }
}
