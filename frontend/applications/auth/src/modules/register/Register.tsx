import React from 'react';
import { Button } from '../components/Button';
import { Redirect } from 'react-router-dom';

import { RegistrationForm } from './components/RegistrationForm';
import { actions } from '../common/state';
import { connect } from 'unistore/react';

export const Register = connect('accountStatus', actions)(({ accountStatus, registerUser, match: { params } }) => {
  return accountStatus === 'registered' ? (
    <Redirect to="/registered" />
  ) : (
    <RegistrationForm phoneNumber={params.phoneNumber} onSubmit={registerUser} />
  );
});
