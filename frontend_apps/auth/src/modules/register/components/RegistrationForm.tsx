import React from 'react';
import { Button } from '../../components/Button';
import { Form, Field } from 'react-final-form';
const labelStyle = {
  maxWidth: '300px',
  display: 'block'
};
export const RegistrationForm = ({ onSubmit }) => (
  <form>
    <h1>Register</h1>
    <div className="row">
      <label style={labelStyle}>
        Name
        <input className="card w-100" type="text" name="name" placeholder="Name" />
      </label>
    </div>
    <div className="row">
      <label style={labelStyle}>
        Email
        <input className="card w-100" type="text" name="email" placeholder="Email" />
      </label>
    </div>
    <div className="row">
      <label style={labelStyle}>
        Rank
        <input className="card w-100" type="text" name="rank" placeholder="Rank" />
      </label>
    </div>
    <div className="row">
      <label style={labelStyle}>
        Phone #
        <input className="card w-100" type="text" name="phoneNumber" placeholder="Phone #" />
      </label>
    </div>
    <div className="row">
      <Button type="button" text="Register" onClick={onSubmit} />
    </div>
  </form>
);
