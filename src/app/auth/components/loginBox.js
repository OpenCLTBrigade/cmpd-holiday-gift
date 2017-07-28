// @flow

import React from 'react';

export default class LoginBox extends React.Component {
  state: {errorMessage: ?string}
  email: HTMLInputElement
  password: HTMLInputElement

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
    return <div className="login-box" id="login-box">
      {/* TODO: Better flash message */}
      { !this.state.errorMessage ? '' :
        <div style={{ border: '2px solid #f00', background: '#fdd' }}>
          {this.state.errorMessage}
        </div> }
      <div className="header">
        <i className="fa fa-sign-in" />
        {this.props.title}
      </div>

      <div className="body">
      <form onSubmit={this.onSubmit.bind(this)}>
          <label>Email: <input name="email" type="text" ref={ref => this.email = ref}/></label>
          <label>Password: <input name="password" type="password" ref={ref => this.password = ref}/></label>
          <input type="submit" value="Login"/>
        </form>
      </div>

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
              {' '}
              <i className="fa fa-user-plus" />
              Register
            </a>
          </div>
        </div>
      </div>
    </div>;
  }
}
