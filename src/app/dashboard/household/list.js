// @flow
import * as React from 'react';
import DataTable from '../components/dataTable';
import { TableHeaderColumn } from 'react-bootstrap-table';

import { getHouseholdList } from 'api/household';
import type { HouseholdType } from 'api/household';

const TD_STYLE = { 
  'min-width': '150px',
  'width': '150px'
 };

export default class List extends React.Component<{}> {
  uploadedFormFormatter(_cell: any, _row: HouseholdType): React.Node {
    return <i className="fa fa-check" />;
  }

  actionCellFormatter(_cell: any, _row: HouseholdType): React.Node {
    return (
      <div>
        <button className="btn btn-sm btn-primary">Show</button>
        <button className="btn btn-sm btn-info">Edit</button>
        <button className="btn btn-sm btn-danger">Delete</button>
      </div>
    );
  }

  async fetch(
    page: number,
    search: ?string
  ): Promise<{ items: HouseholdType[], totalSize: number, sizePerPage: number }> {
    const response: Object = await getHouseholdList(page, search);
    return { items: response.items, totalSize: response.totalSize, per_page: response.per_page };
  }

  render(): React.Node {
    return (
      <DataTable search={true} fetch={this.fetch.bind(this)} searchPlaceholder="Search by last name">
        <TableHeaderColumn dataField="id" hidden isKey>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn tdStyle={TD_STYLE} thStyle={TD_STYLE} dataField="name_first" dataFormat={(cell, row) => `${row.name_first} ${row.name_last}`}>
          Head of Household
        </TableHeaderColumn>
        {/* <TableHeaderColumn dataField="children" dataFormat={cell => cell.length}>Children</TableHeaderColumn> */}
        <TableHeaderColumn tdStyle={TD_STYLE} thStyle={TD_STYLE} dataField="nominator" dataFormat={(cell, row) => `${row.name_first} ${row.name_last}`}>
          Nominated by
        </TableHeaderColumn>
        <TableHeaderColumn tdStyle={TD_STYLE} thStyle={TD_STYLE} dataField="uploaded_form" dataFormat={this.uploadedFormFormatter} dataAlign="center">
          Uploaded Form
        </TableHeaderColumn>
        <TableHeaderColumn tdStyle={TD_STYLE} thStyle={TD_STYLE} dataField="id" dataFormat={this.actionCellFormatter}>
          Actions
        </TableHeaderColumn>
        <TableHeaderColumn tdStyle={TD_STYLE} thStyle={TD_STYLE} dataField="surname">Review</TableHeaderColumn>
      </DataTable>
    );
  }
}
