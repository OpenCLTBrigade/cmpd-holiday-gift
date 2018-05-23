import * as React from 'react';
import DataTable from '../../components/dataTable';
import { Link } from 'react-router-dom';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { getUserList } from '../../../../api/user';
// import type { UserType } from 'api/user';

// type PropsType = {
//   affiliation_id: ?number
// };

const TD_STYLE = {
  'min-width': '150px',
  width: '150px'
};
export default class UserList extends React.Component {
  actionCellFormatter(_cell, row) {
    return (
      <div>
        <Link to={`/dashboard/user/${row.id}`}>
          <button className="btn btn-sm btn-primary">Show</button>
        </Link>
      </div>
    );
  }

  async fetch(page, search) {
    const response = await getUserList(page, search, this.props.affiliation_id);
    const { items, totalSize, per_page } = items;
    return { items, totalSize, per_page };
  }

  render() {
    // Prevent firing before component recieves props
    if (this.props.affiliation_id == null) {
      return null;
    }

    return (
      <DataTable fetch={this.fetch.bind(this)}>
        <TableHeaderColumn dataField="id" hidden isKey>
          Id
        </TableHeaderColumn>
        <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="name_last">
          Last Name
        </TableHeaderColumn>
        <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="name_first">
          First Name
        </TableHeaderColumn>
        <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="email">
          Email
        </TableHeaderColumn>
        <TableHeaderColumn thStyle={TD_STYLE} tdStyle={TD_STYLE} dataField="phone">
          Phone
        </TableHeaderColumn>
        <TableHeaderColumn dataField="id" dataFormat={this.actionCellFormatter}>
          Actions
        </TableHeaderColumn>
      </DataTable>
    );
  }
}
