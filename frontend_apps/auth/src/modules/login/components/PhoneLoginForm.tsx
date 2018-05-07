import React from 'react';
import { Component } from 'react';
import { Button } from '../../components/Button';

import firebase from '../../common/firebase';
import { loginWithCode, registerWithPhone } from '../../common/services/login';

const formatNumber = phoneNumber => `+1${phoneNumber.replace('-', '').replace(' ', '')}`;
const verificationCodeMask = [/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

const labelStyle = {
  maxWidth: '300px',
  display: 'block'
};

export class PhoneLoginForm extends Component<{ onSubmit }, { phone; codeReceived; verificationCode }> {
  state = {
    phone: '',
    verificationCode: '',
    codeReceived: false
  };

  componentDidMount() {
    this.setupRecaptchaVerifier();
  }

  setupRecaptchaVerifier = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: response => {
        this.setState({ codeReceived: true });
      }
    });
  };

  renderLoginForm({ onSubmit }) {
    return (
      <form>
        <div className="row">
          <label style={labelStyle}>
            Verification #
            <input
              className="card w-100"
              type="text"
              placeholder="Verification code"
              value={this.state.verificationCode}
              onInput={e => this.setState({ verificationCode: (e.target as HTMLInputElement).value })}
            />
          </label>
        </div>
        <div className="row">
          <Button
            type="submit"
            text="Login"
            disabled={!!this.state.verificationCode}
            onClick={() => loginWithCode(this.state.verificationCode.replace('-', '')).then(onSubmit)}
          />
        </div>
      </form>
    );
  }

  renderRegisterForm() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          registerWithPhone(formatNumber(this.state.phone));
        }}>
        <div className="row">
          <div className="6 col">
            <label style={labelStyle}>
              Phone #
              <input
                type="phone"
                className="card w-100"
                placeholder="Enter your phone number"
                value={this.state.phone}
                onInput={e => this.setState({ phone: (e.target as HTMLInputElement).value })}
              />
            </label>
          </div>
        </div>
        <div className="row">
          <Button text="Request Code" id="sign-in-button" />
        </div>
      </form>
    );
  }

  render() {
    const { onSubmit } = this.props;
    return (
      <section>{this.state.codeReceived ? this.renderLoginForm({ onSubmit }) : this.renderRegisterForm()}</section>
    );
  }
}
