// @flow

import React from 'react';
import { Redirect } from 'react-router';
import LoginBox from './components/loginBox';

import { AuthToken } from 'lib/auth';

export default class Login extends React.Component {
  box: LoginBox
  render(): React.Element<any> {
    if (!AuthToken.expired()) {
      return <Redirect to="/dashboard"/>;
    }
    return (
        <LoginBox title="Log in" onSubmit={this.onSubmit.bind(this)} ref={ref => this.box = ref} />
    );
  }

  async onSubmit({ email, password }: {email: string, password: string}): Promise<void> {
    try {
      var success = await AuthToken.login(email, password);
      if (success) {
        // TODO: return to the correct page after logging in
        this.props.history.replace(this.props.returnTo || '/dashboard');
      } else {
        this.box.flashErrorMessage('Login failed: wrong email or password');
      }
    } catch (exc) {
      this.box.flashErrorMessage('Login failed: unknown error');
    }
  }
}
