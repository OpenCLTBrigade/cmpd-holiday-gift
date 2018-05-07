import React from 'react';
import { Button } from '../components/Button';

import { PhoneLoginForm } from './components/PhoneLoginForm';
import { actions } from '../common/state';
import { connect } from 'unistore/react';

export const Login = connect('count', actions)(({ loginWithToken }) => (
  <PhoneLoginForm onSubmit={token => loginWithToken(token)} />
));
