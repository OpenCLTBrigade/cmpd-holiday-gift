// @flow

import React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import FooterLink from './components/footer-link.jsx';

import LoginBox from './components/loginBox';

import { AuthToken } from 'lib/auth';
import Footer from './components/footer.jsx';

export default class Login extends React.Component {
  box: LoginBox;
  render(): React.Element<any> {
    if (!AuthToken.expired()) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <LoginBox
        title="Log in"
        onSubmit={this.onSubmit.bind(this)}
        ref={ref => (this.box = ref)}
        footer={
          <Footer>
            <div className="col-xs-6">
              <FooterLink className="btn btn-link" to="/auth/register">
                <i className="fa fa-lock" />
                <span> Forgot Password</span>
              </FooterLink>
            </div>
            <div className="col-xs-6">
              <FooterLink className="btn btn-link pull-right" to="/auth/register">
                <i className="fa fa-user-plus" />
                <span> Register</span>
              </FooterLink>
            </div>
          </Footer>
        }
      />
    );
  }

  async onSubmit({ email, password }: { email: string, password: string }): Promise<void> {
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
