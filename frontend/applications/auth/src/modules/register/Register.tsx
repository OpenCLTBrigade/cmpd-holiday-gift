import React from 'react';
import { Redirect } from 'react-router-dom';

import { RegistrationForm } from './components/RegistrationForm';
import { AuthConsumer } from '../common/contexts';

export const Register = ({ match: { params } }) => (
  <AuthConsumer>
    {({ accountStatus, registerUser }) => {
      return accountStatus === 'registered' ? (
        <Redirect to="/registered" />
      ) : (
        <RegistrationForm phoneNumber={params.phoneNumber} onSubmit={registerUser} />
      );
    }}
  </AuthConsumer>
);
