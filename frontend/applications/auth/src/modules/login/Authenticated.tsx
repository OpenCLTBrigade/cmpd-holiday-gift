import React from 'react';
import { Redirect } from 'react-router';

export const Authenticated = ({ location }) =>
  location.referrer !== location.url ? (
    <Redirect
      to={{
        pathname: location.referrer
      }}
    />
  ) : (
    <div>You have been successfully logged in</div>
  );
