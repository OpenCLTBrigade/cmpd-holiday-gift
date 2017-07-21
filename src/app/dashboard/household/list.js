import React, { Component } from 'react';
import DataTable from '../components/dataTable';
import { TableHeaderColumn } from 'react-bootstrap-table';

export default class List extends Component {

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
    return (
      <DataTable search={true}>
        <TableHeaderColumn dataField="id" hidden isKey>Id</TableHeaderColumn>
        <TableHeaderColumn dataField="name_first" dataFormat={(cell, row) => `${row.name_first} ${row.name_last}`}>
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
      </DataTable>
    );
  }
}
