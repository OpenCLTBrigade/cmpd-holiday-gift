import React, { createContext } from 'react';
import firebase from '../../firebase';
import { register, sendEmailVerification } from '../../services/login';

export type AuthContextProps = {
  accountStatus?: 'unauthenticated' | 'authenticated' | 'unregistered' | 'registered';
  idToken?: string;
  claims?: { [x: string]: any };
  registerUser(userData): void;
  loginWithToken(token): void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthConsumer = AuthContext.Consumer;

type Keys = 'accountStatus' | 'idToken' | 'claims';

export class AuthProvider extends React.Component<{}, Pick<AuthContextProps, Keys>> {
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user && user.emailVerified) {
        if (window.location.pathname.includes('auth')) {
          window.location.replace('/');
        } else {
          const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();

          localStorage.setItem('authToken', idTokenResult.token);

          this.setState({ accountStatus: 'authenticated', idToken: idTokenResult.token });
          this.setState({ accountStatus: 'authenticated', claims: idTokenResult.claims });
        }
      } else {
        this.setState({ accountStatus: 'unauthenticated' });
      }
    });
  };

  registerUser = async userData => {
    console.log('step 1: register user');
    await register(userData);

    console.log('step 2: email verification');
    await sendEmailVerification();

    console.log('step 3: update account status');
    this.setState({ accountStatus: 'registered' });
  };

  loginWithToken = async token => {
    console.log('loginWithToken: User logged in');
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          registerUser: this.registerUser,
          loginWithToken: this.loginWithToken
        }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
