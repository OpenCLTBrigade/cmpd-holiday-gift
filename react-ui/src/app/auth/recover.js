// @flow

import * as React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import FooterLink from './components/footer-link';

import FormBox from './components/form-box';
import { AuthToken } from '../../lib/auth';
import Footer from './components/footer';
import FormGroup from './components/form-group';
import Label from './components/form-label';

import { sendRecoverEmail } from '../../api/recover';

const Icon = styled.i`
  top: 20px !important;
`;

export default class Recover extends React.Component<{
  history: Object
}> {
  box: ?FormBox;
  render(): React.Node {
    if (!AuthToken.expired()) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <FormBox
        title="Recover Account"
        submitText="Recover"
        onSubmit={this.onSubmit.bind(this)}
        headerImageClass="fa fa-lock"
        ref={box => (this.box = box)}
        body={
          <div>
            <FormGroup className="form-group has-feedback">
              <Label>
                E-mail address
                <input className="form-control" name="email" type="text" />
              </Label>
              <Icon className="fa fa-envelope form-control-feedback" />
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
              <FooterLink
                className="btn btn-link pull-right"
                to="/auth/register">
                <i className="fa fa-user-plus" />
                <span> Register</span>
              </FooterLink>
            </div>
          </Footer>
        }
      />
    );
  }

  async onSubmit({ email }: { email: string }): Promise<void> {
    try {
      const success = await sendRecoverEmail(email);
      if (success && success.success === true) {
        // TODO: flash message: "An email has been sent to ... with further instructions"
        alert('Please check your email for recovery instructions.');
        this.props.history.replace('/auth/login');
      } else {
        (this.box: any).flashErrorMessage(
          'Could not initiate account recovery. Did you enter the correct email address?'
        );
      }
    } catch (exc) {
      (this.box: any).flashErrorMessage(
        'Account recovery failed: unknown error'
      );
    }
  }
}
