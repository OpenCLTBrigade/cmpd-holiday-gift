import React from 'react';
import { css } from 'react-emotion';
import { logout } from '../common/services/login';

export const NotApproved = () => (
  <div
    className={css`
      padding: 2rem;
    `}>
    <h1>Come back later!</h1>
    <p>Thanks for registering!</p>
    <p>
      If you have already verified your email address, please contact your program manager so that they can approve you.
    </p>
    <p>
      You have completed registration but you're not able to log in just yet. A program manager will have to review and
      approve your account. You will receive an email once your account has been approved.
    </p>
    <a href="#" onClick={logout}>
      Back to login
    </a>
  </div>
);
