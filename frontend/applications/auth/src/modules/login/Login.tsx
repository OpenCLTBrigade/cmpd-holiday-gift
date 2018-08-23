import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'unistore/react';
import { actions } from '../common/state';
import { Button } from '../components/Button';
import { PhoneLoginForm } from './components/PhoneLoginForm';

export const Login = connect('accountStatus', actions)(({ loginWithToken, history, accountStatus }) => {
  return <PhoneLoginForm history={history} onSubmit={token => loginWithToken(token)} />;
}) as any;
