import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const mockApiProvider = {
  fetch(page) {
    return new Promise((resolve, reject) => {
      resolve({
        total: 1,
        items: [
          {
            id: 1,
            name_first: 'John',
            uploaded_form: true,
            name_last: 'Doe',
            head_of_household_name: 'John Doe',
            child: [
              {
                name: 'Test Buddy'
              }
            ],
            nominator: {
              name_first: 'Sample',
              name_last: 'Nominator'
            }
          }
        ]
      });
    });
  }
};

export default class HouseholdTable extends Component {
  constructor(props) {
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

  fetchData(page = this.state.page) {
    mockApiProvider.fetch(page).then(data => {
      this.setState({ items: data.items, totalSize: data.total, page });
    });
  }

  // It's a data format example.
  priceFormatter(cell, row) {
    return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
  }

  handlePageChange(page) {
    this.fetchData(page);
  }

  uploadedFormFormatter(cell, row) {
    return <i className="fa fa-check" />;
  }

  actionCellFormatter(cell, row) {
    return (
      <div>
        <button className="btn btn-sm btn-primary">Show</button>
        <button className="btn btn-sm btn-info">Edit</button>
        <button className="btn btn-sm btn-danger">Delete</button>
      </div>
    );
  }

  render() {
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
        search
      >
        <TableHeaderColumn dataField="id" hidden isKey>Id</TableHeaderColumn>
        <TableHeaderColumn dataField="head_of_household_name">
          Head of Household
        </TableHeaderColumn>
        <TableHeaderColumn dataField="child" dataFormat={(cell, row) => cell.length}>Children</TableHeaderColumn>
        <TableHeaderColumn dataField="nominator" dataFormat={(cell, row) => `${cell.name_first} ${cell.name_last}`}>
          Nominated by
        </TableHeaderColumn>
        <TableHeaderColumn dataField="uploaded_form" dataFormat={this.uploadedFormFormatter} dataAlign="center">
          Uploaded Form
        </TableHeaderColumn>
        <TableHeaderColumn dataField="id" dataFormat={this.actionCellFormatter}>Actions</TableHeaderColumn>
        <TableHeaderColumn dataField="surname">Review</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}
