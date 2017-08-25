// @flow

import * as React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import FooterLink from './components/footer-link';

import LoginBox from './components/login-box';

import { AuthToken } from 'lib/auth';
import Footer from './components/footer';
import FormGroup from './components/form-group';
import Label from './components/form-label';

const Icon = styled.i`top: 20px !important;`;

export default class Login extends React.Component<{
  history: *,
  location: *,
  returnTo: ?string
}> {
  box: ?LoginBox;
  render(): React.Node {
    if (!AuthToken.expired()) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <LoginBox
        title="Log in"
        submitText="Login"
        onSubmit={this.onSubmit.bind(this)}
        ref={ref => (this.box = ref)}
        body={
          <div>
            <FormGroup className="form-group has-feedback">
              <Label>
                E-mail address
                <input className="form-control" name="email" type="text" />
              </Label>
              <Icon className="fa fa-envelope form-control-feedback" />
            </FormGroup>
            <FormGroup className="form-group has-feedback">
              <Label>
                Password
                <input className="form-control" name="password" type="password" />
              </Label>
              <Icon className="fa fa-lock form-control-feedback" />
            </FormGroup>
          </div>
        }
        footer={
          <Footer>
            <div className="col-xs-6">
              <FooterLink className="btn btn-link" to="/auth/recover">
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
      const success = await AuthToken.login(email, password);
      if (success) {
        this.props.history.replace(
          this.props.location.state != null && this.props.location.state.from != null
            ? this.props.location.state.from
            : '/dashboard');
      } else {
        (this.box: any).flashErrorMessage('Login failed: wrong email or password');
      }
    } catch (exc) {
      (this.box: any).flashErrorMessage('Login failed: unknown error');
      console.log('Error logging in:', exc);
    }
  }
}
