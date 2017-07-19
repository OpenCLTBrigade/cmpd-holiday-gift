import React, { Component } from 'react';
import DataTable from '../components/dataTable';
import { TableHeaderColumn } from 'react-bootstrap-table';

export default class AffiliationList extends Component {
  actionCellFormatter(cell, row) {
    return (
      <div>
        <button className="btn btn-sm btn-primary">Show</button>
      </div>
    );
  }

  render() {
    return (
      <DataTable search={true}>
        <TableHeaderColumn dataField="id" hidden isKey>Id</TableHeaderColumn>
        <TableHeaderColumn dataField="name_first">
          Type
        </TableHeaderColumn>
        <TableHeaderColumn dataField="child" dataFormat={(cell, row) => cell.length}>Name</TableHeaderColumn>
        <TableHeaderColumn dataField="nominator" dataFormat={(cell, row) => `${cell.name_first} ${cell.name_last}`}>
          Phone
        </TableHeaderColumn>
        <TableHeaderColumn dataField="uploaded_form">
          Address
        </TableHeaderColumn>
        <TableHeaderColumn dataField="id" dataFormat={this.actionCellFormatter}>Actions</TableHeaderColumn>
      </DataTable>
    );
  }
}
