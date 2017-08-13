// @flow
import React, { Component } from 'react';
import { BootstrapTable } from 'react-bootstrap-table';

export default class DataTable<Row> extends Component<*, *, *> {
  state: {
    items: Row[],
    totalSize: number,
    page: number,
    sizePerPage: number
  };
  props: {
    fetch: (number, ?string) => Promise<{ items: Row[], totalSize: number }>,
    children: Component<any, any, any>[]
  };
  constructor() {
    super();
    this.state = {
      items: [],
      totalSize: 1,
      sizePerPage: 25,
      page: 1
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(page: number = this.state.page, searchText: string = '') {
    // console.log('fetchData', page, searchText);
    this.props.fetch(page, searchText).then(data => {
      // console.log('results', data.items);
      this.setState({ items: data.items, totalSize: data.totalSize, page, sizePerPage: data.sizePerPage });
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

    return (
      <BootstrapTable
        data={(this.state.items: Array<any>)}
        fetchInfo={{ dataTotalSize: this.state.totalSize }}
        options={options}
        striped
        hover
        remote
        pagination={this.props.pagination !== undefined ? this.props.pagination : true}
        search={this.props.search ? true : false}
        searchPlaceholder={this.props.searchPlaceholder || 'Search'}
      >
        {this.props.children}
      </BootstrapTable>
    );
  }
}
