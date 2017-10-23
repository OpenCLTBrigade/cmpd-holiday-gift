// @flow

import * as React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import FooterLink from './components/footer-link';

import * as querystring from '../../lib/queryString';

import FormBox from './components/form-box';
import { AuthToken } from '../../lib/auth';
import Footer from './components/footer';
import FormGroup from './components/form-group';
import Label from './components/form-label';

import { resetPassword } from '../../api/recover';

const Icon = styled.i`top: 20px !important;`;

export default class Recover extends React.Component<{
  history: Object
}> {
  box: ?FormBox;

  
  constructor(props) {
    const qs = querystring.parse();
    super(props);
    this.state = {
      id: qs.id || null,
      confirmation_code: qs.confirmation_code || null
    };
  }

  render(): React.Node {
    if (!AuthToken.expired()) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <FormBox
        title="Set new password"
        submitText="Recover"
        onSubmit={this.onSubmit.bind(this)}
        headerImageClass="fa fa-lock"
        ref={box => this.box = box}
        body={
          <div>
            <FormGroup className="form-group has-feedback">
              <Label>
                New Password
                <input className="form-control" name="password" type="password" />
              </Label>
              <Icon className="fa fa-key form-control-feedback" />
            </FormGroup>
            <FormGroup className="form-group has-feedback">
              <Label>
                Confirm Password
                <input className="form-control" name="password_confirm" type="password" />
              </Label>
              <Icon className="fa fa-key form-control-feedback" />
            </FormGroup>
          </div>
        }
        footer={
          <Footer>
            <div className="col-xs-6">
              <FooterLink className="btn btn-link" to="/auth/login">
                <i className="fa fa-sign-in" />
                <span> Login</span>
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

  async onSubmit({ password, password_confirm }: {email: string}): Promise<void> {
    try {
      const { id, confirmation_code } = this.state;

      if (!id || !confirmation_code) {
        alert('Invalid reset code!');
        return;
      }
      if (!password || password.length < 8) {
        alert('Your password must be at least eight characters long.');
        return;
      }
      if (!password || !password_confirm || password !== password_confirm) {
        alert('Passwords do not match!');
        return;
      }

      const success = await resetPassword(id, confirmation_code, password);
      if (success) {
        alert('Your password has been reset! Please log in.');
        this.props.history.replace('/auth/login');
      } else {
        (this.box: any).flashErrorMessage(
          'An issue occurred while trying to reset your password. Maybe a bad reset link?'
        );
      }
    } catch (exc) {
      (this.box: any).flashErrorMessage('Account recovery failed: unknown error');
      console.log(exc);
    }
  }
}
