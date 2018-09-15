import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthConsumer, AuthProvider } from './modules/common/contexts';
import Container from './modules/components/Container';
import { Login } from './modules/login/Login';
import { Register } from './modules/register/Register';
import { Registered } from './modules/register/Registered';

const AppRouter = () => (
  <AuthConsumer>
    {({ accountStatus }) => {
      return (
        <Router basename="/auth">
          <div>
            <Route path="/" exact component={Login} />
            <Route path="/register/:phoneNumber" component={Register} />
            <Route path="/registered" component={Registered} />
          </div>
        </Router>
      );
    }}
  </AuthConsumer>
);

export default () => (
  <AuthProvider>
    <Container>
      <AppRouter />
    </Container>
  </AuthProvider>
);
