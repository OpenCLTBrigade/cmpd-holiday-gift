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
  padding: 10px 20px;
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
`;

export default class LoginBox extends React.Component {
  state: { errorMessage: ?string };
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
        {/* TODO: Better flash message */}
        <Header>
          <i className="fa fa-sign-in" />
          {` ${this.props.title}`}
        </Header>
        <Body className="body">
          <ErrorMessage
            errorMessage={this.state.errorMessage}
            onDismissError={() => this.setState(() => ({ errorMessage: '' }))}
          />
          <Form onSubmit={this.onSubmit.bind(this)}>
            <label>
              Email:
              <input className="form-control" name="email" type="text" ref={ref => (this.email = ref)} />
            </label>
            <label>
              Password:
              <input className="form-control" name="password" type="password" ref={ref => (this.password = ref)} />
            </label>
            <Button className="btn bg-auth btn-block btn-flat" type="submit" value="Login" />
          </Form>
        </Body>
        <div className="body" />

        <div className="footer">
          <hr />
          <div className="row">
            <div className="col-xs-6">
              <a className="btn btn-link">
                {' '}<i className="fa fa-lock" />
                Forgot Password
              </a>
            </div>
            <div className="col-xs-6">
              <a className="btn btn-link pull-right">
                {' '}<i className="fa fa-user-plus" />
                Register
              </a>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}
