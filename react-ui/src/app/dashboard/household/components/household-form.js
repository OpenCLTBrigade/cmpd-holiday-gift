// @flow
import * as React from 'react';

import HouseholdForm from './form/head-of-household';
import AddressForm from './form/address';
import PhoneNumbers from './form/phone-numbers';
import ChildForm from './form/child';
import { Row, Col, Button } from 'react-bootstrap';
import { Form } from 'neoform';
import { FormValidation } from 'neoform-validation';
import Files from './form/files';

const Household = ({
    onSubmit,
    onInvalid,
    onSaveDraft,
    onUpdate,
    validate,
    data,
    addChild,
    removeChild,
    affiliations,
    onFileChange,
    removePhoneNumber,
    addPhoneNumber,
    onAddressChange,
    disabled,
    status
}) => {
  return (
        <form
            onSubmit={e => {
              e.preventDefault();

              validate(data.household && data.household.id ? onUpdate : onSaveDraft, onInvalid);

            }}>
            <HouseholdForm />
            <AddressForm onChange={onAddressChange}/>
            <PhoneNumbers removePhoneNumber={removePhoneNumber} addPhoneNumber={addPhoneNumber} phoneNumbers={data.phoneNumbers}/>
            <ChildForm
                nominations={data.nominations}
                addChild={addChild}
                removeChild={removeChild}
                affiliations={affiliations}
            />
            {status === 1 && <Files files={data.files} onChange={onFileChange} />}
            <Row>
                <Col xs={12}>
                    <Button type="submit" disabled={disabled}>{data.household && data.household.id ? 'Update' : 'Save Draft'}</Button>
                    {status === 1 && <Button onClick={onSubmit}>Submit Nomination</Button>}
                </Col>
            </Row>
        </form>
  );
};

export default Form(FormValidation(Household));
