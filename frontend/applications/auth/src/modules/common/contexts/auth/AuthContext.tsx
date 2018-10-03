import React, { createContext } from 'react';
import firebase from '../../firebase';
import { register, sendEmailVerification } from '../../services/login';
import { pathOr } from 'rambda';

type AccountStatus = 'unknown' | 'unauthenticated' | 'authenticated' | 'unregistered' | 'registered' | 'not_verified';

export type AuthContextProps = {
  accountStatus?: AccountStatus;
  idToken?: string;
  claims?: { [x: string]: any };
  registerUser(userData): void;
  loginWithToken(token): void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthConsumer = AuthContext.Consumer;

type Keys = 'accountStatus' | 'idToken' | 'claims';
type State = Pick<AuthContextProps, Keys>;

export class AuthProvider extends React.Component<{}, State> {
  state = {
    accountStatus: 'unknown' as AccountStatus
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async user => {
      const isEmailVerified = pathOr(false, ['emailVerified'], user);
      const isRegistered = pathOr(false, ['email'], user);

      //FIXME: This seems like it can be simplified
      if (!user) {
        localStorage.removeItem('authToken');

        this.setState({ accountStatus: 'unauthenticated' });
      } else if (!isRegistered) {
        this.setState({ accountStatus: 'unauthenticated' });
      } else if (user && isEmailVerified) {
        const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();

        localStorage.setItem('authToken', idTokenResult.token);

        if (window.location.pathname.includes('auth')) {
          window.location.href = '/';
        } else {
          this.setState({
            accountStatus: 'authenticated',
            idToken: idTokenResult.token,
            claims: idTokenResult.claims.claims
          });
        }
      } else if (user && !isEmailVerified) {
        this.setState({ accountStatus: 'not_verified' });
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
