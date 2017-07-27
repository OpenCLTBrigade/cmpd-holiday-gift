import React, { Component } from 'react';
import DataTable from '../components/dataTable';
import { TableHeaderColumn } from 'react-bootstrap-table';

import {getHouseholdList} from 'api/household'

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

  async fetch(page: number) {
    console.log('TODO ATN fetching page', page);
    var {households} = await getHouseholdList(page);
    console.log('TODO ATN got page', page, households);
    var total = 150; // TODO
    return {items: households, total};
  }

  render() {
    return (
      <DataTable search={true} fetch={this.fetch.bind(this)}>
        <TableHeaderColumn dataField="id" hidden isKey>Id</TableHeaderColumn>
        <TableHeaderColumn dataField="name_first" dataFormat={(cell, row) => `${row.name_first} ${row.name_last}`}>
          Head of Household
        </TableHeaderColumn>
        <TableHeaderColumn dataField="children" dataFormat={(cell, row) => cell.length}>Children</TableHeaderColumn>
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
