import * as React from 'react';

import HeadOfHousehold from './form/head-of-household';
import AddressForm from './form/address';
import PhoneNumbers from './form/phone-numbers';
import Child from './form/child';
import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap';
import Files from './form/files';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';

const Household = ({
  onSubmit,
  onSave,
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
  user,
  status
}) => {
  return (
    <Form
      onSubmit={onSave}
      initialValues={{ ...data, address: data.household.address }}
      mutators={{
        ...arrayMutators
      }}
      render={({
        handleSubmit,
        reset,
        submitting,
        pristine,
        values,
        mutators: { push, pop, remove } // injected from final-form-arrays above
      }) => {
        const { phoneNumbers, childNominations } = values;
        console.log(values.household.phoneNumbers);

        return (
          <form onSubmit={handleSubmit}>
            <HeadOfHousehold />
            <AddressForm onChange={onAddressChange} user={user} />
            <PhoneNumbers
              removePhoneNumber={() => pop('phoneNumbers')}
              addPhoneNumber={() => push('phoneNumbers', {})}
              phoneNumbers={values.household.phoneNumbers}
            />
            <Child
              childNominations={childNominations}
              addChild={() => push('childNominations', {})}
              removeChild={idx => remove('childNominations', idx)}
              affiliations={affiliations}
            />
            {status >= 1 && <Files files={data.files} onChange={onFileChange} />}
            <Row>
              <Col xs={12}>
                <ButtonToolbar>
                  <Button type="submit" disabled={disabled}>
                    {data.household && data.household.id ? 'Update' : 'Save Draft'}
                  </Button>
                  {status === 1 && <Button onClick={onSubmit}>Submit Nomination</Button>}
                </ButtonToolbar>
              </Col>
            </Row>
          </form>
        );
      }}
    />
  );
};

export default Household;
