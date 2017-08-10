// @flow

import React from 'react';
import styled from 'styled-components';

import ErrorMessage from './error-message';

const Wrapper = styled.div`
  background-color: white;
  margin: 10px auto;
`;

const Header = styled.div`
  background: #00355d;
  border-radius: 4px 4px 0 0;
  box-shadow: 0 -3px 0 rgba(0, 0, 0, .2) inset;
  color: #fff;
  font-size: 26px;
  font-weight: 300;
  padding: 20px 10px;
  text-align: center;
`;

const Body = styled.div`
  padding: 10px 20px 0 20px;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Button = styled.input`
  background-color: #00355d;
  font-weight: 700;
  color: #fff;
  &:hover {
    color: #fff;
  }

  &:focus {
    color: #fff;
  }
`;

const FormGroup = styled.div`display: flex;`;

const Label = styled.label`flex: 1;`;

const Icon = styled.i`top: 20px !important;`;

export default class LoginBox extends React.Component {
  state: {
    errorMessage: ?string
  };
  footer: any;
  email: HTMLInputElement;
  password: HTMLInputElement;

  constructor() {
    super();
    this.state = { errorMessage: null };
  }

  onSubmit(ev: Event) {
    ev.preventDefault();
    this.props.onSubmit({ email: this.email.value, password: this.password.value });
  }

  flashErrorMessage(message: string) {
    this.setState({ errorMessage: message });
  }

  render(): React.Element<any> {
    return (
      <Wrapper className="login-box" id="login-box">
        <Header>
          <i className="fa fa-sign-in" />
          {` ${this.props.title}`}
        </Header>
        {/* TODO:  Login box needs to accept content  */}
        <Body className="body">
          <ErrorMessage
            errorMessage={this.state.errorMessage}
            onDismissError={() => this.setState(() => ({ errorMessage: '' }))}
          />
          <Form onSubmit={this.onSubmit.bind(this)}>
            <FormGroup className="form-group has-feedback">
              <Label>
                E-mail address
                <input className="form-control" name="email" type="text" ref={ref => (this.email = ref)} />
              </Label>
              <Icon className="fa fa-envelope form-control-feedback" />
            </FormGroup>
            <FormGroup className="form-group has-feedback">
              <Label>
                Password
                <input className="form-control" name="password" type="password" ref={ref => (this.password = ref)} />
              </Label>
              <Icon className="fa fa-lock form-control-feedback" />
            </FormGroup>
            <Button className="btn bg-auth btn-block btn-flat" type="submit" value="Login" />
          </Form>
        </Body>
        {this.props.footer}
      </Wrapper>
    );
  }
}
