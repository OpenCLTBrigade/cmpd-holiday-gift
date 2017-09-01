// @flow
import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import Box from '../components/box';
import DataTable from '../components/dataTable';
import { Link } from 'react-router-dom';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { getAffiliationList } from 'api/affiliation';
import type { AffiliationType } from 'api/affiliation';

export default class AffiliationList extends React.Component<{}> {
  actionCellFormatter(_cell: any, row: AffiliationType): React.Node {
    return (
      <div>
        <Link to={`/dashboard/affiliation/${row.id}`}>
        <button className="btn btn-sm btn-primary">Show</button>
        </Link>
      </div>
    );
  }

  async fetch(
    page: number,
    search: ?string
  ): Promise<{ items: AffiliationType[], totalSize: number, sizePerPage: number }> {
    const response: Object = await getAffiliationList(page, search);
    return { items: response.items, totalSize: response.totalSize, sizePerPage: response.sizePerPage };
  }

  render(): React.Node {
    return (
      <Row>
        <Col xs={12}>
          <Box title="Affiliation List">
            <DataTable search={true} fetch={this.fetch.bind(this)}
                       searchPlaceholder="Filter by name" pagination={false}>
              <TableHeaderColumn dataField="type" hidden isKey>
                Type
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="phone">Phone</TableHeaderColumn>
              <TableHeaderColumn
                dataField="address_street"
                dataFormat={(cell, row) =>
                  `${row.address_street} ${row.address_street2 != null
                    ? row.address_street2
                    : ''}<br/> ${row.address_city}, ${row.address_state}, ${row.address_zip}`}
              >
                Address
              </TableHeaderColumn>
              <TableHeaderColumn dataField="id" dataFormat={this.actionCellFormatter}>
                Actions
              </TableHeaderColumn>
            </DataTable>
          </Box>
        </Col>
      </Row>
    );
  }
}
