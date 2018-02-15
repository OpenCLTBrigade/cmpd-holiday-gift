import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import Box from '../components/box';
import DataTable from '../components/dataTable';
import { Link } from 'react-router-dom';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { getAffiliationList } from '../../../api/affiliation';
// import type { AffiliationType } from 'api/affiliation';

const TD_STYLE = {
  'min-width': '150px',
  width: '150px'
};
export default class AffiliationList extends React.Component {
  actionCellFormatter(_cell, row) {
    return (
      <div>
        <Link to={`/dashboard/affiliation/${row.id}`}>
          <button className="btn btn-sm btn-primary">Show</button>
        </Link>
      </div>
    );
  }

  async fetch(page, search) {
    const response = await getAffiliationList(page, search);
    return {
      items: response.items,
      totalSize: response.totalSize,
      sizePerPage: response.sizePerPage
    };
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <Box title="Affiliation List">
            <DataTable
              search={true}
              fetch={this.fetch.bind(this)}
              searchPlaceholder="Filter by name"
              pagination={false}>
              <TableHeaderColumn dataField="type" hidden isKey>
                Type
              </TableHeaderColumn>
              <TableHeaderColumn
                tdStyle={TD_STYLE}
                thStyle={TD_STYLE}
                dataField="name">
                Name
              </TableHeaderColumn>
              <TableHeaderColumn
                tdStyle={TD_STYLE}
                thStyle={TD_STYLE}
                dataField="phone">
                Phone
              </TableHeaderColumn>
              <TableHeaderColumn
                tdStyle={TD_STYLE}
                thStyle={TD_STYLE}
                dataField="address_street"
                dataFormat={(cell, row) =>
                  `${row.address_street} ${
                    row.address_street2 != null ? row.address_street2 : ''
                  }<br/> ${row.address_city}, ${row.address_state}, ${
                    row.address_zip
                  }`
                }>
                Address
              </TableHeaderColumn>
              <TableHeaderColumn
                tdStyle={TD_STYLE}
                thStyle={TD_STYLE}
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
