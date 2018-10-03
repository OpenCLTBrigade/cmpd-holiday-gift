import React from 'react';
import { logout } from '../common/services/login';

export const Registered = () => (
  <div>
    <h1>Next steps:</h1>
    <p>Thanks for registering!</p>
    <p>
      In a few moments you should receive an email at the address you entered. Please click the link in that email to
      verify your email address.
    </p>
    <p>
      Once you verify your email address you won't be able to log in just yet (even if the verification page says so). A
      program manager will have to review and approve your account. You will receive an email once your account has been
      approved.
    </p>
    <a href="#" onClick={logout}>
      Back to login
    </a>
  </div>
);
