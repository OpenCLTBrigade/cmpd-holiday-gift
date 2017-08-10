// @flow

import React from 'react';
import { Redirect } from 'react-router';

import LoginBox from './components/loginBox';

import { AuthToken } from 'lib/auth';
import Footer from './components/footer.jsx';
import FooterLink from './components/footer-link.jsx';
export default class Register extends React.Component {
  render(): React.Element<any> {
    if (!AuthToken.expired()) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <LoginBox
        title="Register"
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
