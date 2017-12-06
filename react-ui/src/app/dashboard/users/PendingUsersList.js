// @flow
import * as React from 'react';
import DataTable from '../components/dataTable';
import { Row, Col } from 'react-bootstrap';
import Box from '../components/box';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { getPendingUserList as getUserList } from 'api/user';
import { approveUser, declineUser } from '../../../api/user';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import type { UserType } from 'api/user';

const PAGE_TITLE = 'Pending Users';

const StyledButton = styled.button`
  margin-right: 5px;
`;

const StyledLink = styled(Link)`
  margin-right: 5px;
`;

const TD_STYLE_LG = {
  'min-width': '200px',
  width: '200px'
};

export default class UsersList extends React.Component<{}> {
  actionCellFormatter = (cell: any, row: UserType): React.Node => {
    return (
      <div>
        <StyledLink
          className="btn btn-sm btn-default"
          to={`/dashboard/user/${row.id}`}>
          Show
        </StyledLink>
        <StyledButton
          className="btn btn-sm btn-success"
          onClick={() => this.onClickApprove(row)}>
          Approve
        </StyledButton>
        <StyledButton
          className="btn btn-sm btn-danger"
          onClick={() => this.onClickDecline(row)}>
          Decline
        </StyledButton>
      </div>
    );
  };

  async fetch(
    page: number,
    search: ?string
  ): Promise<{ items: UserType[], totalSize: number, sizePerPage: number }> {
    const response: Object = await getUserList(page, search);
    return {
      items: response.items,
      totalSize: response.totalSize,
      sizePerPage: response.sizePerPage
    };
  }

  onClickApprove = user => {
    approveUser(user.id)
      .then(response => {
        if (response.data === true) {
          this.table.handlePageChange(1);
        } else {
          alert('An error occured while approving the user. Please try again.');
        }
      })
      .catch(err => {
        alert('An error occured while approving the user. Please try again.');
        console.log(err);
      });
  };

  onClickDecline = user => {
    declineUser(user.id)
      .then(response => {
        if (response.data === true) {
          this.table.handlePageChange(1);
        } else {
          alert('An error occured while declining the user. Please try again.');
        }
      })
      .catch(err => {
        alert('An error occured while declining the user. Please try again.');
        console.log(err);
      });
  };

  render(): React.Node {
    return (
      <Row>
        <Col xs={12}>
          <Box title={PAGE_TITLE}>
            <DataTable
              search={true}
              fetch={this.fetch}
              searchPlaceholder="Filter by last name"
              ref={table => {
                this.table = table;
              }}>
              <TableHeaderColumn dataField="id" hidden isKey>
                Id
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name_last">
                Last Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name_first">
                First Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
              <TableHeaderColumn dataField="phone">Phone</TableHeaderColumn>
              <TableHeaderColumn
                dataField="affiliation"
                dataFormat={cell => cell.type.toUpperCase()}>
                Affiliation
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="affiliation"
                dataFormat={cell => cell.name}>
                Location
              </TableHeaderColumn>
              <TableHeaderColumn
                tdStyle={TD_STYLE_LG}
                thStyle={TD_STYLE_LG}
                dataField="id"
                dataFormat={this.actionCellFormatter}>
                Actions
              </TableHeaderColumn>
            </DataTable>
          </Box>
        </Col>
      </Row>
    );
  }
}
