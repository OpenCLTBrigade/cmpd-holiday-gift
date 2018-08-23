import React from 'react';

import { PhoneLoginForm } from './components/PhoneLoginForm';
import { AuthConsumer } from '../common/contexts';

export const Login = () => (
  <AuthConsumer>
    {({ loginWithToken }) => {
      return <PhoneLoginForm history={history} onSubmit={token => loginWithToken(token)} />;
    }}
  </AuthConsumer>
);
