import React from 'react';

export default props => (
  <div className="login-box" id="login-box">
    {/* TODO: Flash message */}
    <div className="header">
      <i className="fa fa-sign-in" />
      {props.title}
    </div>

    {/* TODO: Form declaraction using action from props */}
    <div className="body">
      {props.children}
    </div>

    <div className="footer">
      {/* TODO: Submit button. Get title from props */}
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
  </div>
);
