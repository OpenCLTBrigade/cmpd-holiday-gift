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
  
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  uploadedFormFormatter(_cell: any, _row: HouseholdType): React.Node {
    return <i className="fa fa-check" />;
  }

  // Called by householdIndex when FeedbackModal is closed
  handlePageChange(pageNumber) {
    this.table.handlePageChange(pageNumber);
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

  reviewCellFormatter = (cell, row: HouseholdType): React.Node => {
    const { currentPage } = this.state;
    return (
      <div>
        <button className="btn btn-sm btn-default" onClick={() => this.props.openHouseholdReview(row, currentPage)}>
          Review
        </button>
      </div>
    );
  }

  async fetch(
    page: number,
    search: ?string
  ): Promise<{ items: HouseholdType[], totalSize: number, sizePerPage: number }> {
    this.setState({ currentPage: page }); // Used for refreshing list when submitting feedback
    const response: Object = await getHouseholdList(page, search);
    return { items: response.items, totalSize: response.totalSize, per_page: response.per_page };
  }

  render(): React.Node {
    return (
      <DataTable search={true} fetch={this.fetch.bind(this)} searchPlaceholder="Search by last name" ref={(table) => {
        this.table = table;
      }}>
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
        <TableHeaderColumn tdStyle={TD_STYLE} thStyle={TD_STYLE} dataField="surname" dataFormat={this.reviewCellFormatter}>
          Review
        </TableHeaderColumn>
      </DataTable>
    );
  }
}
