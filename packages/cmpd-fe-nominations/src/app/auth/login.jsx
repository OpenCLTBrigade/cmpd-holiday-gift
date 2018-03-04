import * as React from 'react';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import FooterLink from './components/footer-link';

import FormBox from './components/form-box';

import { AuthToken } from '../../lib/auth';
import Footer from './components/footer';
import FormGroup from './components/form-group';
import Label from './components/form-label';
import querystring from 'querystring';

const Icon = styled.i`
  top: 20px !important;
`;

export default class Login extends React.Component {
  // box: ?FormBox;
  // justRegistered: boolean;

  componentDidMount() {
    const params = querystring.parse(this.props.location.search);
    console.log('ohey', params);
    if (params['?justRegistered'] && (params['?justRegistered'] === 'true' || params['?justRegistered'] === true)) {
      this.box.flashErrorMessage('Check your email to continue the registration process.');
    }
  }

  render() {
    if (!AuthToken.expired()) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <FormBox
        title="Log in"
        submitText="Login"
        headerImageClass="fa fa-sign-in"
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

  async onSubmit({ email, password }) {
    try {
      const success = await AuthToken.login(email, password);
      if (success) {
        this.props.history.replace(
          this.props.location.state != null && this.props.location.state.from != null
            ? this.props.location.state.from
            : '/dashboard'
        );
      } else {
        this.box.flashErrorMessage('Login failed: wrong email or password');
      }
    } catch (exc) {
      this.box.flashErrorMessage('Login failed: unknown error');
      console.log('Error logging in:', exc);
    }
  }
}
