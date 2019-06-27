import React from 'react';
import { AuthProvider } from './Auth';

function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default AppProviders;
