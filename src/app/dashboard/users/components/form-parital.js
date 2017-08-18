// @flow
import React from 'react';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import Box from '../../components/box';
import Input from './form/input';
import { Form } from 'neoform';
import { FormValidation } from 'neoform-validation';
import requiredValidator from '../validators/required.validator';
import { getAffiliationList } from 'api/affiliation';
import SelectList from './selectList';
import type { AffiliationType } from 'api/affiliation';
import DataTable from '../../components/dataTable';


 export default class SelectOptions extends React.Component {


  async fetch(
    page: number,
    search: string = ''
  ): Promise<{ items: AffiliationType[], totalSize: number, sizePerPage: number }> {
    let response: Object = await getAffiliationList(page, search);
    return { items: response.items, totalSize: response.totalSize, sizePerPage: response.sizePerPage };
  }

 

  render(): React.Element<any> {
    
    return (
      <SelectList search={true} fetch={this.fetch} searchPlaceholder="Filter by name" pagination={false} />
    );
  }

}
