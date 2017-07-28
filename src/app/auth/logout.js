// @flow

import React from 'react';
import { Redirect } from 'react-router';

import { AuthToken } from 'lib/auth';

export default class Logout extends React.Component {
  constructor() {
    super();
    AuthToken.logout();
  }

  render(): React.Element<any> {
    return <Redirect to="/auth/login"/>;
  }
}
