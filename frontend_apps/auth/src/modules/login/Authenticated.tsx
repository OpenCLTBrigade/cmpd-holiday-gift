import React from 'react';
import { Redirect } from 'react-router';

export const Authenticated = ({ location }) => (
  <Redirect
    to={{
      pathname: location.referrer
    }}
  />
);
