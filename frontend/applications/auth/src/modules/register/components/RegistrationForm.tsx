import React from 'react';
import { Button } from '../../components/Button';
import { Form, Field } from 'react-final-form';
import styled from 'react-emotion';
import Input from '../../components/Input';
import { Span } from '../../components/Text';
import { getAllAffiliations } from '../../common/services/affiliation';

const Label = styled('a')({
  maxWidth: '300px',
  display: 'block'
});

const LabelError = styled('span')({
  color: 'red'
});

const FieldGroup = styled('div')({});

const SelectField = ({ label, name, placeholder, disabled = false, options }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <div>
        <Label>
          <Span>{label}</Span>
          <select placeholder={placeholder} disabled={disabled} {...input}>
            {options}
          </select>
        </Label>
        {meta.error && meta.touched && <LabelError>{meta.error}</LabelError>}
      </div>
    )}
  </Field>
);

const TextField = ({ label, name, placeholder, disabled = false }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <div>
        <Label>
          <Span>{label}</Span>
          <Input className="" type="text" placeholder={placeholder} disabled={disabled} {...input} />
        </Label>
        {meta.error && meta.touched && <LabelError>{meta.error}</LabelError>}
      </div>
    )}
  </Field>
);

const validateRegistration = values => {
  const errors: { name?; email?; confirmEmail?; phoneNumber?; rank?; affiliationId? } = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.confirmEmail) {
    errors.confirmEmail = 'Required';
  }
  if (values.email !== values.confirmEmail) {
    errors.confirmEmail = 'Must match email';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required';
  }
  if (!values.rank) {
    errors.rank = 'Required';
  }
  if (!values.affiliationId) {
    errors.affiliationId = 'Required';
  }

  console.log(values);
  return errors;
};

export class RegistrationForm extends React.Component<{ onSubmit; phoneNumber }> {
  state = {
    affiliationItems: []
  };
  async componentDidMount() {
    console.log('here');
    const items = await getAllAffiliations();

    console.log('here', await fetch('http://localhost:3002/api/nominations/affiliations'));
    this.setState({ affiliationItems: items });
  }
  render() {
    const { onSubmit, phoneNumber } = this.props;
    const items = this.state.affiliationItems;
    const affiliationList = items.map(item => (
      <option key={item.id} value={item.id}>
        {item.type.toUpperCase()} - {item.name}
      </option>
    ));

    return (
      <Form
        onSubmit={onSubmit}
        initialValues={{ phoneNumber }}
        validate={validateRegistration}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <FieldGroup>
              <TextField label="Name" name="name" placeholder="Name" />
            </FieldGroup>
            <FieldGroup>
              <TextField label="Email" name="email" placeholder="Email" />
            </FieldGroup>
            <FieldGroup>
              <TextField label="Confirm email" name="confirmEmail" placeholder="Confirm email address" />
            </FieldGroup>
            <FieldGroup>
              <SelectField
                name="affiliationId"
                placeholder="Affiliation"
                label="Affiliation"
                options={affiliationList}
              />
            </FieldGroup>
            <FieldGroup>
              <TextField label="Rank" name="rank" placeholder="Rank" />
            </FieldGroup>
            <FieldGroup>
              <TextField name="phoneNumber" placeholder="Phone #" label="Phone #" disabled />
            </FieldGroup>
            <FieldGroup>
              <Button type="submit" text="Register" disabled={submitting} />
            </FieldGroup>
          </form>
        )}
      />
    );
  }
}
