// @flow
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Box from '../components/box';
import DataTable from '../components/dataTable';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { getAffiliationList } from 'api/affiliation';
import type { AffiliationType } from 'api/Affiliation';

export default class AffiliationList extends Component {
  actionCellFormatter(_cell: any, _row: AffiliationType): React.Element<any> {
    return (
      <div>
        <button className="btn btn-sm btn-primary">Show</button>
      </div>
    );
  }

  async fetch(page: number, search: string = ''): Promise<{ items: AffiliationType[], totalSize: number }> {
    let response: Object = await getAffiliationList(page, search);
    return { items: response.items, totalSize: response.totalSize };
  }

  render(): React.Element<any> {
    return (
      <Row>
        <Col xs={12}>
          <Box title="Affiliation List">
            <DataTable search={true} fetch={this.fetch} searchPlaceholder="Filter by name">
              <TableHeaderColumn dataField="type" hidden isKey>
                Type
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
              <TableHeaderColumn dataField="phone">Phone</TableHeaderColumn>
              <TableHeaderColumn
                dataField="address_street"
                dataFormat={(cell, row) =>
                  `${row.address_street} ${row.address_street2 !== null
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
