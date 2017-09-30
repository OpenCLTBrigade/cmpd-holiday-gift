// @flow
import * as React from 'react';

import HouseholdForm from './form/head-of-household';
import AddressForm from './form/address';
import PhoneNumbers from './form/phone-numbers';
import ChildForm from './form/child';
import { Row, Col, Button } from 'react-bootstrap';
import { Form } from 'neoform';
import { FormValidation } from 'neoform-validation';

const Household = ({ onSubmit, onInvalid, validate, data, addChild, removeChild, affiliations, saved }) => {
  return (
        <form
            onSubmit={e => {
              e.preventDefault();
              validate(onSubmit, onInvalid);
            }}
        >
            <HouseholdForm />
            <AddressForm />
            <PhoneNumbers />
            <ChildForm
                nominations={data.nominations}
                addChild={addChild}
                removeChild={removeChild}
                affiliations={affiliations}
            />
            <Row>
                <Col xs={12}>
                    <Button type="submit">Save Draft</Button>
                    {saved && <Button type="submit">Publish</Button>}
                </Col>
            </Row>
        </form>
  );
};

export default Form(FormValidation(Household));
