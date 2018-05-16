import React from 'react';
import { Button } from '../../components/Button';
import { Form, Field } from 'react-final-form';
import styled from 'react-emotion';

const Label = styled('a')({
  maxWidth: '300px',
  display: 'block'
});

const LabelError = styled('span')({
  color: 'red'
});

const TextField = ({ label, name, placeholder, disabled = false }) => (
  <Field name={name}>
    {({ input, meta }) => (
      <div>
        <Label>
          {label}
          <input className="card w-100" type="text" placeholder={placeholder} disabled={disabled} {...input} />
        </Label>
        {meta.error && meta.touched && <LabelError>{meta.error}</LabelError>}
      </div>
    )}
  </Field>
);

const validateRegistration = values => {
  const errors: { name?; email?; confirmEmail?; phoneNumber?; rank?; affiliation? } = {};
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
  if (!values.affiliation) {
    errors.affiliation = 'Required';
  }
  return errors;
};

export const RegistrationForm = ({ onSubmit, phoneNumber }) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{ phoneNumber }}
    validate={validateRegistration}
    render={({ handleSubmit, reset, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="row">
          <TextField label="Name" name="name" placeholder="Name" />
        </div>
        <div className="row">
          <TextField label="Email" name="email" placeholder="Email" />
        </div>
        <div className="row">
          <TextField label="Confirm email" name="confirmEmail" placeholder="Confirm emal address" />
        </div>
        <div className="row">
          <TextField name="affiliation" placeholder="Affiliation" label="Affiliation" />
        </div>
        <div className="row">
          <TextField label="Rank" name="rank" placeholder="Rank" />
        </div>
        <div className="row">
          <TextField name="phoneNumber" placeholder="Phone #" label="Phone #" disabled />
        </div>
        <div className="row">
          <Button type="submit" text="Register" disabled={submitting} />
        </div>
      </form>
    )}
  />
);
