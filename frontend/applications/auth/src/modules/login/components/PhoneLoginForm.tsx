import React from 'react';
import { Component } from 'react';
import { Button } from '../../components/Button';

import firebase from '../../common/firebase';
import { loginWithCode, login, verifyPhoneNumber } from '../../common/services/login';
import { formatNumber } from '../../common/util/formatters';

const verificationCodeMask = [/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

const labelStyle = {
  maxWidth: '300px',
  display: 'block'
};

export class PhoneLoginForm extends Component<{ onSubmit; history }, { phone; codeReceived; verificationCode }> {
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

  onVerificationCodeInput = e => this.setState({ verificationCode: (e.target as HTMLInputElement).value });

  onSubmitLoginForm = async e => {
    e.preventDefault();
    const { onSubmit, history } = this.props;

    await loginWithCode(this.state.verificationCode.replace('-', ''));

    const exists = await verifyPhoneNumber(formatNumber(this.state.phone));

    if (exists) {
      onSubmit();
    } else {
      history.push(`register/${this.state.phone}`);
    }
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
              onInput={this.onVerificationCodeInput}
            />
          </label>
        </div>
        <div className="row">
          <Button type="submit" text="Login" disabled={!this.state.verificationCode} onClick={this.onSubmitLoginForm} />
        </div>
      </form>
    );
  }

  onSubmitRequestTokenForm = async e => {
    e.preventDefault();
    await login(formatNumber(this.state.phone));
  };

  onPhoneInput = e => this.setState({ phone: (e.target as HTMLInputElement).value });

  renderRequestTokenForm() {
    return (
      <form onSubmit={this.onSubmitRequestTokenForm}>
        <div className="row">
          <div className="6 col">
            <label style={labelStyle}>
              Phone #
              <input
                type="tel"
                className="card w-100"
                placeholder="Enter your phone number"
                value={this.state.phone}
                onInput={this.onPhoneInput}
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
      <section>{this.state.codeReceived ? this.renderLoginForm({ onSubmit }) : this.renderRequestTokenForm()}</section>
    );
  }
}
