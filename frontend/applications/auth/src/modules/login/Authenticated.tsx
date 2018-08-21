import React from 'react';
import { Redirect } from 'react-router';

//TODO: Redirect back to correct path
export const Authenticated = ({ location }) => {
  return location.referrer !== location.url ? (
    <Redirect
      to={{
        pathname: location.referrer
      }}
    />
  ) : (
    <div>You have been successfully logged in</div>
  );
};
