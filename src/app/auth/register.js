// @flow

import React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import LoginBox from './components/login-box';

import { AuthToken } from 'lib/auth';
import Footer from './components/footer.jsx';
import FooterLink from './components/footer-link.jsx';
import FormGroup from './components/form-group.jsx';
import Label from './components/form-label.jsx';
const Icon = styled.i`top: 20px !important;`;

export default class Register extends React.Component {
  render(): React.Element<any> {
    if (!AuthToken.expired()) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <LoginBox
        title="Register"
        submitText="Register"
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
              <FooterLink className="btn btn-link" to="/auth/login">
                <i className="fa fa-sign-in" />
                <span> Login</span>
              </FooterLink>
            </div>
          </Footer>
        }>
        WIP
      </LoginBox>
    );
  }
}
