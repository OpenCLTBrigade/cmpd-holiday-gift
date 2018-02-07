// @flow
import * as React from 'react';
import DataTable from '../../components/dataTable';
import { Link } from 'react-router-dom';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { getUserList } from 'api/user';
import type { UserType } from 'api/user';

type PropsType = {
  affiliation_id: ?number
};

const TD_STYLE = { 
  'min-width': '150px',
  'width': '150px'
 };
export default class UserList extends React.Component<PropsType> {


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
    const response: Object = await getUserList(page, search, this.props.affiliation_id);
    return { items.items, totalSize.totalSize, per_page.per_page };
  }

  render(): React.Node {
    // Prevent firing before component recieves props
    if (this.props.affiliation_id == null) {
      return null;
    }

    return (
      <DataTable fetch={this.fetch.bind(this)} >
        <TableHeaderColumn dataField="id" hidden isKey>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="name_last">Last Name</TableHeaderColumn>
        <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="name_first">First Name</TableHeaderColumn>
        <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="email">Email</TableHeaderColumn>
        <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="phone">Phone</TableHeaderColumn>
        <TableHeaderColumn dataField="id" dataFormat={this.actionCellFormatter}>
          Actions
        </TableHeaderColumn>
      </DataTable>
    );
  }
}
