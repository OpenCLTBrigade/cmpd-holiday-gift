import * as React from 'react';
import { BootstrapTable } from 'react-bootstrap-table';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { useAuth } from '../../../contexts/Auth';
import { Link } from 'react-router-dom';
import RecordActionItems from './RecordActionItems';

const TD_STYLE_LARGE = {
  minWidth: '175px',
  width: '175px'
};

const TD_STYLE = {
  minWidth: '150px',
  width: '150px'
};

const TD_STYLE_SMALL = {
  minWidth: '75px',
  width: '75px'
};
const TD_STYLE_XSMALL = {
  minWidth: '50px',
  width: '50px'
};

export function HouseholdTable({ households, handleDelete, openHouseholdReview }) {
  const { claims } = useAuth();

  const reviewCellFormatter = (cell, row) => {
    return (
      <div>
        {row.reviewed !== true && (
          <button className="btn btn-sm btn-default" onClick={() => openHouseholdReview(row)}>
            Review
          </button>
        )}
        {row.reviewed && row.approved && <i className="fa fa-check" />}
      </div>
    );
  };

  function nominatorCellFormatter(cell, row) {
    if (!row.nominatorId) {
      console.log('NOPE', row);
      return null;
    }
    return <Link to={`/dashboard/user/${row.nominatorId}`}>{row.nominatedBy}</Link>;
  }

  function actionCellFormatter(cell, row) {
    console.log(row);
    return <RecordActionItems handleDelete={handleDelete} householdId={row.id} />;
  }

  function uploadedFormFormatter(cell, row) {
    return row.attachment_data && row.attachment_data.length > 0 ? <i className="fa fa-check" /> : null;
  }

  return (
    <BootstrapTable
      data={households}
      striped
      hover
      remote
      containerClass="table-responsive"
      tableContainerClass="table-responsive">
      <TableHeaderColumn dataField="id" hidden isKey>
        Id
      </TableHeaderColumn>
      <TableHeaderColumn
        tdStyle={TD_STYLE}
        thStyle={TD_STYLE}
        dataField="firstName"
        dataFormat={(cell, row) => `${row.firstName} ${row.lastName}`}>
        Head of Household
      </TableHeaderColumn>
      <TableHeaderColumn tdStyle={TD_STYLE_XSMALL} thStyle={TD_STYLE_XSMALL} dataField="childCount">
        Children
      </TableHeaderColumn>
      {/* <TableHeaderColumn dataField="children" dataFormat={cell => cell.length}>Children</TableHeaderColumn> */}
      <TableHeaderColumn
        tdStyle={TD_STYLE}
        thStyle={TD_STYLE}
        dataField="nominator"
        dataFormat={nominatorCellFormatter}>
        Nominated by
      </TableHeaderColumn>
      <TableHeaderColumn
        tdStyle={TD_STYLE_XSMALL}
        thStyle={TD_STYLE_XSMALL}
        dataField="uploaded_form"
        dataFormat={uploadedFormFormatter}
        dataAlign="center">
        Form
      </TableHeaderColumn>
      {claims &&
        claims['admin'] && (
          <TableHeaderColumn
            tdStyle={TD_STYLE_SMALL}
            thStyle={TD_STYLE_SMALL}
            dataField="draft"
            dataFormat={submittedCellFormatter}>
            Draft?
          </TableHeaderColumn>
        )}
      <TableHeaderColumn
        tdStyle={TD_STYLE_LARGE}
        thStyle={TD_STYLE_LARGE}
        dataField="id"
        dataFormat={actionCellFormatter}>
        Actions
      </TableHeaderColumn>
      {claims &&
        claims['admin'] && (
          <TableHeaderColumn
            tdStyle={TD_STYLE_SMALL}
            thStyle={TD_STYLE_SMALL}
            dataField="surname"
            dataFormat={reviewCellFormatter}>
            Review
          </TableHeaderColumn>
        )}
    </BootstrapTable>
  );
}

const submittedCellFormatter = (cell, row) => {
  return row.status === 'DRAFTED' ? <i className="fa fa-check" /> : '';
};
