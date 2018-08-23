import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from '../common/state';
import { Button } from '../components/Button';
import { RegistrationForm } from './components/RegistrationForm';

export const Register = connect('accountStatus', actions)(({ accountStatus, registerUser, match: { params } }) => {
  return accountStatus === 'registered' ? (
    <Redirect to="/registered" />
  ) : (
    <RegistrationForm phoneNumber={params.phoneNumber} onSubmit={registerUser} />
  );
}) as any;
