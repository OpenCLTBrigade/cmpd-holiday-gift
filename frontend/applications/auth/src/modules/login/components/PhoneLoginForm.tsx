import React from 'react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../common/firebase';
import { login, loginWithCode, verifyPhoneNumber } from '../../common/services/login';
import { formatNumber } from '../../common/util/formatters';
import { Button } from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import { Span, Text } from '../../components/Text';

const logoUrl = require('../../../assets/logo.jpg');

const verificationCodeMask = [/[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

const labelStyle = {
  maxWidth: '300px',
  display: 'block'
};

class PhoneLoginForm extends Component<
  { onSubmit; history },
  { phone; codeReceived; verificationCode; loading: boolean }
> {
  state = {
    phone: '',
    verificationCode: '',
    codeReceived: false,
    loading: false
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

    this.setState({ loading: true });
    await loginWithCode(this.state.verificationCode.replace('-', ''));

    const exists = await verifyPhoneNumber(formatNumber(this.state.phone));
    this.setState({ loading: false });
    if (exists) {
      const { currentUser } = firebase.auth();
      if (currentUser && !currentUser.emailVerified) {
        alert(
          'Please check your inbox for a verification email. After you have been verified a program manager needs to approve your account.'
        );
        window.location.reload();
        return;
      }
      onSubmit();
    } else {
      history.push(`register/${this.state.phone}`);
    }
  };

  renderTokenVerificationForm({ onSubmit }) {
    const { loading } = this.state;
    return (
      <div>
        <form>
          <div className="">
            <div style={{ textAlign: 'center' }}>
              Please enter the verification code that we texted to the phone number you entered.
              <hr />
            </div>
            <label style={labelStyle}>
              <Span>Verification #</Span>

              <Input
                className=""
                type="text"
                placeholder="Verification code"
                value={this.state.verificationCode}
                onInput={this.onVerificationCodeInput}
              />
            </label>
          </div>
          <div className="">
            <Loader style={{ display: !loading ? 'none' : 'block' }} />
            <Button
              type="submit"
              text="Continue"
              disabled={!this.state.verificationCode}
              onClick={this.onSubmitLoginForm}
              style={{ display: loading ? 'none' : 'block' }}
            />
          </div>
        </form>
      </div>
    );
  }

  onSubmitRequestTokenForm = async e => {
    e.preventDefault();
    this.setState({ loading: true }, async () => {
      await login(formatNumber(this.state.phone));
      this.setState({
        loading: false
      });
    });
  };

  onPhoneInput = e => this.setState({ phone: (e.target as HTMLInputElement).value });

  renderRequestTokenForm() {
    const { loading } = this.state;
    return (
      <form onSubmit={this.onSubmitRequestTokenForm}>
        <div className="">
          <div style={{ textAlign: 'center' }}>
            This year we're using cellphone-based authentication to make things easier for our participants. Please
            enter your cellphone number in the form below to register or log in. We will text you a confirmation code
            that you will enter on the next screen to proceed.
          </div>
          <hr />
          <div className="">
            <label style={labelStyle}>
              <Span>Mobile phone #</Span>
              <Input
                width="full"
                type="tel"
                placeholder="Enter your phone number"
                value={this.state.phone}
                onInput={this.onPhoneInput}
              />
            </label>
          </div>
        </div>
        <div className="">
          <Loader style={{ display: !loading ? 'none' : 'block' }} />
          <Button text="Send verification code" id="sign-in-button" style={{ display: loading ? 'none' : 'block' }} />
        </div>
      </form>
    );
  }

  render() {
    const { onSubmit } = this.props;
    return (
      <section>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img src={logoUrl} style={{ maxWidth: '200px' }} />
          <hr />
        </div>
        {this.state.codeReceived ? this.renderTokenVerificationForm({ onSubmit }) : this.renderRequestTokenForm()}
      </section>
    );
  }
}

export default withRouter(PhoneLoginForm as any) as any;
