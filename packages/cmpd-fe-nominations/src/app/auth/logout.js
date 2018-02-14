import * as React from 'react';
import { Redirect } from 'react-router';

import { AuthToken } from '../../lib/auth';

export default class Logout extends React.Component {
  constructor() {
    super();
    AuthToken.logout();
    window.location.href = '/'; // Hard navigation to login screen. Dirty fix for GIFT-216
  }

  render() {
    // return <Redirect to="/auth/login"/>;
    return (
      <div style={{ 'text-align': 'center' }}>
        <h3>Logging out</h3>
        <br />
        <a href="/">Click here if you are not redirected.</a>
      </div>
    );
  }
}
