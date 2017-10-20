// @flow

import * as React from 'react';
import { Redirect } from 'react-router';

import { AuthToken } from 'lib/auth';

export default class Logout extends React.Component<{}> {
  constructor() {
    super();
    AuthToken.logout();
    window.location.href = '/'; // Hard navigation to login screen. Dirty fix for GIFT-216
  }

  render(): React.Node {
    // return <Redirect to="/auth/login"/>;
    return null;
  }
}
