import React from 'react';
import { AuthConsumer } from '../common/contexts';
import PhoneLoginForm from './components/PhoneLoginForm';

export const Login = () => (
  <AuthConsumer>
    {({ loginWithToken }) => {
      return <PhoneLoginForm onSubmit={token => loginWithToken(token)} />;
    }}
  </AuthConsumer>
);
