// @flow
import React, { Component } from 'react';
import DataTable from '../components/dataTable';
import { TableHeaderColumn } from 'react-bootstrap-table';

import { getHouseholdList } from 'api/household';
import type { HouseholdType } from 'api/household';

export default class List extends Component {
  uploadedFormFormatter(_cell: any, _row: HouseholdType): React.Element<any> {
    return <i className="fa fa-check" />;
  }

  actionCellFormatter(_cell: any, _row: HouseholdType): React.Element<any> {
    return (
      <div>
        <button className="btn btn-sm btn-primary">Show</button>
        <button className="btn btn-sm btn-info">Edit</button>
        <button className="btn btn-sm btn-danger">Delete</button>
      </div>
    );
  }

  async fetch(page: number, search: string = ''): Promise<{ items: HouseholdType[], totalSize: number }> {
    let response: Object = await getHouseholdList(page, search);
    return { items: response.items, totalSize: response.totalSize };
  }

  async doSearch(searchText: string, _colInfos: ?Object, _multiColumnSearch: ?Object): Promise<*> {
    return await this.fetch(0, searchText);
  }

  render(): React.Element<any> {
    return (
      <DataTable
        search={true}
        fetch={this.fetch.bind(this)}
        onSearchChange={this.doSearch.bind(this)}
        searchPlaceholder="Search by last name"
      >
        <TableHeaderColumn dataField="id" hidden isKey>
          Id
        </TableHeaderColumn>
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
        <TableHeaderColumn dataField="id" dataFormat={this.actionCellFormatter}>
          Actions
        </TableHeaderColumn>
        <TableHeaderColumn dataField="surname">Review</TableHeaderColumn>
      </DataTable>
    );
  }
}
