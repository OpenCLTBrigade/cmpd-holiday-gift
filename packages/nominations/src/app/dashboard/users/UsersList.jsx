import * as React from 'react';
import DataTable from '../components/dataTable';
import { Row, Col } from 'react-bootstrap';
import Box from '../components/box';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { getUserList } from '../../../api/user';
// import type { UserType } from 'api/user';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'Active Users';

const TD_STYLE = {
  'min-width': '150px',
  width: '150px'
};
export default class UsersList extends React.Component {
  actionCellFormatter(cell, row) {
    return (
      <div>
        <Link to={`/dashboard/user/${row.id}`}>
          <button className="btn btn-sm btn-primary">Show</button>
        </Link>
        <Link to={`/dashboard/user/${row.id}/edit`}>
          <button className="btn btn-sm btn-default">Edit</button>
        </Link>
      </div>
    );
  }

  countListFormatter(cell, row) {
    return `${row.households.length}`;
  }

  async fetch(page, search) {
    const response = await getUserList(page, search);
    const { items, totalSize, per_page } = response;

    return { items, totalSize, per_page };
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Box title={PAGE_TITLE}>
            <DataTable search={true} fetch={this.fetch.bind(this)} searchPlaceholder="Filter by last name">
              <TableHeaderColumn dataField="id" hidden isKey>
                Id
              </TableHeaderColumn>
              <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="lastName">
                Last Name
              </TableHeaderColumn>
              <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="firstName">
                First Name
              </TableHeaderColumn>
              <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="email">
                Email
              </TableHeaderColumn>
              <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="phone">
                Phone
              </TableHeaderColumn>
              <TableHeaderColumn
                thStyle={TD_STYLE}
                tdStyle={TD_STYLE}
                dataField="affiliation"
                dataFormat={cell => cell.type.toUpperCase()}>
                Affiliation
              </TableHeaderColumn>
              <TableHeaderColumn
                thStyle={TD_STYLE}
                tdStyle={TD_STYLE}
                dataField="affiliation"
                dataFormat={cell => cell.name}>
                Location
              </TableHeaderColumn>
              <TableHeaderColumn
                thStyle={TD_STYLE}
                tdStyle={TD_STYLE}
                dataField="id"
                dataFormat={this.actionCellFormatter}>
                Actions
              </TableHeaderColumn>
              <TableHeaderColumn
                thStyle={TD_STYLE}
                tdStyle={TD_STYLE}
                dataField="nomination"
                dataFormat={this.countListFormatter}>
                Nominations
              </TableHeaderColumn>
            </DataTable>
          </Box>
        </Col>
      </Row>
    );
  }
}
