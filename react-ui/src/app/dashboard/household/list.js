// @flow
import * as React from 'react';
import DataTable from '../components/dataTable';
import { TableHeaderColumn } from 'react-bootstrap-table';

import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { getHouseholdList } from 'api/household';

import type { HouseholdType } from 'api/household';


const TD_STYLE_LARGE = { 
  'min-width': '175px',
  'width': '175px'
 };

 const TD_STYLE = { 
  'min-width': '150px',
  'width': '150px'
 };

 const TD_STYLE_SMALL = { 
  'min-width': '75px',
  'width': '75px'
 };

 const StyledButton = styled.button`
  margin-right: 5px;
 `;

export default class List extends React.Component<{}> {
  
  constructor(props) {
    super(props);
    this.currentPage = 1;
  }

  uploadedFormFormatter(_cell: any, _row: HouseholdType): React.Node {
    return <i className="fa fa-check" />;
  }

  // Called by householdIndex when FeedbackModal is closed
  handlePageChange(pageNumber) {
    this.table.handlePageChange(pageNumber);
  }

  actionCellFormatter(cell: any, row: HouseholdType): React.Node {
    return (
      <div>
        <Link to={`/dashboard/household/show/${row.id}`}>
          <StyledButton className="btn btn-sm btn-primary">Show</StyledButton>
        </Link>
        <Link to={`/dashboard/household/edit/${row.id}`}>
          <StyledButton className="btn btn-sm btn-info">Edit</StyledButton>
        </Link>
        <StyledButton className="btn btn-sm btn-danger">Delete</StyledButton>
      </div>
    );
  }

  reviewCellFormatter = (cell, row: HouseholdType): React.Node => {
    const { currentPage } = this;
    return (
      <div>
        {row.reviewed !== true &&
          <button className="btn btn-sm btn-default" onClick={() => this.props.openHouseholdReview(row, currentPage)}>
            Review
          </button>
        }
        {row.reviewed && row.approved && <i className="fa fa-check"/>}
      </div>
    );
  }

  async fetch(
    page: number,
    search: ?string
  ): Promise<{ items: HouseholdType[], totalSize: number, sizePerPage: number }> {
    this.currentPage = page; // Used for refreshing list when submitting feedback
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
        <TableHeaderColumn tdStyle={TD_STYLE} thStyle={TD_STYLE} dataField="nominator" dataFormat={(cell, row) => row.nominator ? `${row.nominator.name_first} ${row.nominator.name_last}` : ''}>
          Nominated by
        </TableHeaderColumn>
        <TableHeaderColumn tdStyle={TD_STYLE_SMALL} thStyle={TD_STYLE_SMALL} dataField="uploaded_form" dataFormat={this.uploadedFormFormatter} dataAlign="center">
          Form
        </TableHeaderColumn>
        <TableHeaderColumn tdStyle={TD_STYLE_LARGE} thStyle={TD_STYLE_LARGE} dataField="id" dataFormat={this.actionCellFormatter}>
          Actions
        </TableHeaderColumn>
        <TableHeaderColumn tdStyle={TD_STYLE_SMALL} thStyle={TD_STYLE_SMALL} dataField="surname" dataFormat={this.reviewCellFormatter}>
          Review
        </TableHeaderColumn>
      </DataTable>
    );
  }
}
