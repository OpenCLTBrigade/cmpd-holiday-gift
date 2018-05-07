import React from 'react';
import { Button } from '../components/Button';

import { RegistrationForm } from './components/RegistrationForm';
import { actions } from '../common/state';
import { connect } from 'unistore/react';

export const Register = connect('', actions)(({ registerUser }) => (
  <RegistrationForm onSubmit={token => registerUser(token)} />
));
