// @flow
import React, { Component } from 'react';
import { BootstrapTable } from 'react-bootstrap-table';

export default class DataTable<Row> extends Component<*, *, *> {
  state: {
    items:  Row[],

  };
  props: {
    fetch: (number, ?string) => Promise < { items: Row[]} >,
    children: Component < any, any, any>[]
  };
  constructor() {
    super();
    this.state = {
      items: [],

    };
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
    var options = {
      sizePerPage: this.state.sizePerPage, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: true, // Accept bool or function
      hideSizePerPage: true,
      onPageChange: this.handlePageChange,
      searchDelayTime: 500,
      onSearchChange: this.props.search ? this.handleSearchChange : undefined
    };
    console.log(this.props.items);
    // var data = this.state.items[0];
    // console.log(data);
    return(
      <ul>
        {this.state.items.map(function(item){
          return (
            <li>{item.type}</li>
          );
        })}
      </ul>
    )
  }
}
