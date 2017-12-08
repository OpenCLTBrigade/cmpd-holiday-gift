// @flow
import * as React from 'react';
import DataTable from '../components/dataTable';
import { TableHeaderColumn } from 'react-bootstrap-table';

import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getHouseholdList, deleteNomination } from 'api/household';
import RecordActionItems from './RecordActionItems';

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
const TD_STYLE_XSMALL = {
  'min-width': '50px',
  'width': '50px'
};

export default class List extends React.Component<{}> {

  constructor(props) {
    super(props);
    this.currentPage = 1;

    this.state = {
      isDeleting: false
    };

    this.refetch.bind(this)
  }

  uploadedFormFormatter(cell: any, row: HouseholdType): React.Node {
    return row.attachment_data && row.attachment_data.length > 0 ? <i className="fa fa-check" /> : null;
  }

  // Called by householdIndex when FeedbackModal is closed
  handlePageChange(pageNumber) {
    this.table.handlePageChange(pageNumber);
  }

  actionCellFormatter(cell: any, row: HouseholdType): React.Node {
    return <RecordActionItems handleDelete={this.handleDelete} householdId={row.id} />
  }

  handleDelete = (id: number) => {
    this.setState({ isDeleting: true }, () => {
      deleteNomination(id).then(() => {
        this.setState({ isDeleting: false });
        this.refetch();
      });
    });
  }

  refetch() {
    const { page, searchText } = this.state;
    this.table.fetchData(page, searchText);
  }

  nominatorCellFormatter(cell, row) {
    if (!row.nominator) {
      console.log('NOPE', row);
      return null;
    }
    return (
      <Link to={`/dashboard/user/${row.nominator.id}`}>
        {row.nominator.name_first} {row.nominator.name_last}
      </Link>
    );
  }

  submittedCellFormatter = (cell, row) => {
    return (row.draft === false) ? <i className="fa fa-check"/> : '';
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
    return { items.items, totalSize.totalSize, per_page.per_page };
  }

  render(): React.Node {
    const { user } = this.props;

    // TODO: Needs Redux hardcore
    if (!user) {
      return null;
    }

    return (
      <DataTable onFetch={(page, searchText) => this.setState(() => ({ page, searchText }))} search={true} fetch={this.fetch.bind(this)} searchPlaceholder="Search by last name" ref={(table) => {
        this.table = table;
      }}>
        <TableHeaderColumn dataField="id" hidden isKey>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn tdStyle={TD_STYLE} thStyle={TD_STYLE} dataField="name_first" dataFormat={(cell, row) => `${row.name_first} ${row.name_last}`}>
          Head of Household
        </TableHeaderColumn>
        <TableHeaderColumn tdStyle={TD_STYLE_XSMALL} thStyle={TD_STYLE_XSMALL} dataField="name_first" dataFormat={(cell, row) => row.children ? `${row.children.length}` : 0}>
          Children
        </TableHeaderColumn>
        {/* <TableHeaderColumn dataField="children" dataFormat={cell => cell.length}>Children</TableHeaderColumn> */}
        <TableHeaderColumn tdStyle={TD_STYLE} thStyle={TD_STYLE} dataField="nominator" dataFormat={this.nominatorCellFormatter}>
          Nominated by
        </TableHeaderColumn>
        <TableHeaderColumn tdStyle={TD_STYLE_XSMALL} thStyle={TD_STYLE_XSMALL} dataField="uploaded_form" dataFormat={this.uploadedFormFormatter} dataAlign="center">
          Form
        </TableHeaderColumn>
        {user && user.role !== 'admin' &&
          <TableHeaderColumn tdStyle={TD_STYLE_SMALL} thStyle={TD_STYLE_SMALL} dataField="draft" dataFormat={this.submittedCellFormatter}>
            <acronym title="If there isn't a check in this column you need to edit the nomination and select Submit at the bottom.">Submitted</acronym>
          </TableHeaderColumn>
        }
        <TableHeaderColumn tdStyle={TD_STYLE_LARGE} thStyle={TD_STYLE_LARGE} dataField="id" dataFormat={this.actionCellFormatter.bind(this)}>
          Actions
        </TableHeaderColumn>
        {user && user.role === 'admin' &&
          <TableHeaderColumn tdStyle={TD_STYLE_SMALL} thStyle={TD_STYLE_SMALL} dataField="surname" dataFormat={this.reviewCellFormatter}>
            Review
          </TableHeaderColumn>
        }
      </DataTable>
    );
  }
}
