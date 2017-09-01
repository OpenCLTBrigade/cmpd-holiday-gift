// @flow
import * as React from 'react';
import DataTable from '../../components/dataTable';
import { Link } from 'react-router-dom';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { getUserList } from 'api/user';
import type { UserType } from 'api/user';

type propsType = {
  affiliation_id: number
};

type stateType = {
  data: any
};

export default class UserList extends React.Component<propsType, stateType> {


  actionCellFormatter(_cell: any, row: UserType): React.Node {
    return (
      <div>
        <Link to={`/dashboard/user/${row.id}`}>
        <button className="btn btn-sm btn-primary">Show</button>
        </Link>
      </div>
    );
  }

  async fetch(
    page: number,
    search: ?string
  ): Promise<{ items: UserType[], totalSize: number, sizePerPage: number }> {
    console.log('affiliation_id', this.props.affiliation_id);
    const response: Object = await getUserList(page, search, this.props.affiliation_id);
    return { items: response.items, totalSize: response.totalSize, sizePerPage: response.sizePerPage };
  }

  render(): React.Node {
    // Prevent firing before component recieves props
    if (!this.props.affiliation_id) {
      return null;
    }

    return (
      <DataTable fetch={this.fetch.bind(this)} >
        <TableHeaderColumn dataField="id" hidden isKey>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="name_last">Last Name</TableHeaderColumn>
        <TableHeaderColumn dataField="name_first">First Name</TableHeaderColumn>
        <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
        <TableHeaderColumn dataField="phone">Phone</TableHeaderColumn>
        <TableHeaderColumn dataField="id" dataFormat={this.actionCellFormatter}>
          Actions
        </TableHeaderColumn>
      </DataTable>
    );
  }
}
