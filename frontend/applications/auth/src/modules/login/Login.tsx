import React from 'react';
import { Button } from '../components/Button';
import { Redirect } from 'react-router-dom';

import { PhoneLoginForm } from './components/PhoneLoginForm';
import { actions } from '../common/state';
import { connect } from 'unistore/react';

export const Login = connect('accountStatus', actions)(
  ({ loginWithToken, history, accountStatus }) =>
    accountStatus === 'authenticated' ? (
      <Redirect to="/authenticated" />
    ) : accountStatus === 'unauthenticated' ? (
      <PhoneLoginForm history={history} onSubmit={token => loginWithToken(token)} />
    ) : null
);
