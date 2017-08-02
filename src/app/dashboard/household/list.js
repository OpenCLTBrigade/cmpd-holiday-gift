// @flow

import React, { Component } from 'react';
import DataTable from '../components/dataTable';
import { TableHeaderColumn } from 'react-bootstrap-table';

import { getHouseholdList } from 'api/household';
import type { Household } from 'api/household';

export default class List extends Component {

  uploadedFormFormatter(_cell: any, _row: Household): React.Element<any> {
    return <i className="fa fa-check" />;
  }

  actionCellFormatter(_cell: any, _row: Household): React.Element<any> {
    return (
      <div>
        <button className="btn btn-sm btn-primary">Show</button>
        <button className="btn btn-sm btn-info">Edit</button>
        <button className="btn btn-sm btn-danger">Delete</button>
      </div>
    );
  }

  async fetch(page: number): Promise<{items: Household[], totalSize: number}> {
    var response = await getHouseholdList(page);
    return { items: response.items, totalSize: response.totalSize };
  }

  render(): React.Element<any> {
    return (
      <DataTable search={true} fetch={this.fetch.bind(this)}>
        <TableHeaderColumn dataField="id" hidden isKey>Id</TableHeaderColumn>
        <TableHeaderColumn dataField="name_first" dataFormat={(cell, row) => `${row.name_first} ${row.name_last}`}>
          Head of Household
        </TableHeaderColumn>
        {/* <TableHeaderColumn dataField="children" dataFormat={cell => cell.length}>Children</TableHeaderColumn> */}
        <TableHeaderColumn dataField="nominator" dataFormat={(cell, row) => `${row.name_first} ${row.name_last}`}>
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
