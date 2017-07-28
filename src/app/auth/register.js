// @flow

import React from 'react';
import { Redirect } from 'react-router';

import LoginBox from './components/loginBox';

import { AuthToken } from 'lib/auth';

export default class Register extends React.Component {
  render(): React.Element<any> {
    if (!AuthToken.expired()) {
      return <Redirect to="/dashboard"/>;
    }
    return (
      <LoginBox title="Register">
        WIP
      </LoginBox>
    );
  }
}
