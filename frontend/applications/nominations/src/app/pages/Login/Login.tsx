import * as React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import FooterLink from '../../auth/components/footer-link';

import FormBox from '../../auth/components/form-box';

import Footer from '../../auth/components/footer';
import FormGroup from '../../auth/components/form-group';
import Label from '../../auth/components/form-label';
import firebase from '../../../services/auth';
const Icon = styled.i`
  top: 20px !important;
`;

export default class Login extends React.Component {
  render() {
    return (
      <FormBox
        title="Log in"
        submitText="Login"
        headerImageClass="fa fa-sign-in"
        onSubmit={this.onSubmit.bind(this)}
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

  async onSubmit({ email, password }) {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (exc) {
      alert('Login failed: wrong email or password');
      console.log('Error logging in:', exc);
    }
  }
}
