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

  async fetch(page, search, sizePerPage) {
    const response = await getAffiliationList(page, search, sizePerPage);
    return {
      items: response.items,
      page: response.page,
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
              pagination={true}
              sizePerPage="50">
              <TableHeaderColumn dataField="type" hidden isKey>
                Type
              </TableHeaderColumn>
              <TableHeaderColumn tdStyle={TD_STYLE} thStyle={TD_STYLE} dataField="name">
                Name
              </TableHeaderColumn>
              <TableHeaderColumn tdStyle={TD_STYLE} thStyle={TD_STYLE} dataField="phone">
                Phone
              </TableHeaderColumn>
              <TableHeaderColumn
                tdStyle={TD_STYLE}
                thStyle={TD_STYLE}
                dataField="addressStreet"
                dataFormat={(cell, row) =>
                  `${row.addressStreet} ${row.addressStreet2 != null ? row.addressStreet2 : ''}<br/> ${
                    row.addressCity
                  }, ${row.addressState}, ${row.addressZip}`
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
