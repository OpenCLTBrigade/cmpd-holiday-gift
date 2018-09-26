import React from 'react';
import { css } from 'react-emotion';

export const NotApproved = () => (
  <div
    className={css`
      padding: 2rem;
    `}>
    <h1>Come back later!</h1>
    <p>Thanks for registering!</p>
    <p>
      You have completed registration but you're not able to log in just yet. A program manager will have to review and
      approve your account. You will receive an email once your account has been approved.
    </p>
  </div>
);
