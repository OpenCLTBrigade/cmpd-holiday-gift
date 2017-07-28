// @flow

import React, { Component } from 'react';
import DataTable from '../components/dataTable';
import { TableHeaderColumn } from 'react-bootstrap-table';

type User = any; // TODO

export default class UsersList extends Component {
  actionCellFormatter(_cell: any, _row: User): React.Element<any> {
    return (
      <div>
        <button className="btn btn-sm btn-primary">Show</button>
      </div>
    );
  }

  render(): React.Element<any> {
    return (
      <DataTable search={true}>
        <TableHeaderColumn dataField="id" hidden isKey>Id</TableHeaderColumn>
        <TableHeaderColumn dataField="name_last">
          Last Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name_first">
          First Name
        </TableHeaderColumn>
        <TableHeaderColumn dataField="child" dataFormat={cell => cell.length}>Email</TableHeaderColumn>
        <TableHeaderColumn dataField="nominator" dataFormat={cell => `${cell.name_first} ${cell.name_last}`}>
          Phone
        </TableHeaderColumn>
        <TableHeaderColumn dataField="uploaded_form">
          Affiliation
        </TableHeaderColumn>
        <TableHeaderColumn dataField="uploaded_form">
          Location
        </TableHeaderColumn>
        <TableHeaderColumn dataField="id" dataFormat={this.actionCellFormatter}>Actions</TableHeaderColumn>
      </DataTable>
    );
  }
}
