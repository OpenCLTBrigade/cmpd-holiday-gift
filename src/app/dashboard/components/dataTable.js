// @flow
import React, { Component } from 'react';
import { BootstrapTable } from 'react-bootstrap-table';

type PropType = {
  search: boolean,
  children: ?React.Element<*>
};
export default class DataTable extends Component {
  state: {
    items: Array<*>,
    totalSize: number,
    page: number
  };

  constructor(props: PropType) {
    super(props);
    this.state = {
      items: [],
      totalSize: 1,
      page: 1
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(page: number = this.state.page) {
    this.props.fetch(page).then(data => {
      this.setState({ items: data.items, totalSize: data.total, page });
    });
  };

  handlePageChange = (page: number) => {
    this.fetchData(page);
  };

  render(): React.Element<*> {
    var options = {
      sizePerPage: 25, // which size per page you want to locate as default
      pageStartIndex: 0, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: true, // Accept bool or function
      hideSizePerPage: true,
      onPageChange: this.handlePageChange
    };

    return (
      <BootstrapTable
        data={this.state.items}
        fetchInfo={{ dataTotalSize: this.state.totalSize }}
        options={options}
        striped
        hover
        remote
        pagination
        search={this.props.search || false}
      >
        {this.props.children}
      </BootstrapTable>
    );
  }
}
