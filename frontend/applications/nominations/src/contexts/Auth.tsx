import React, { useContext } from 'react';
import firebase from 'firebase';

export function AuthProvider(props) {
  const [state, setState] = React.useState(() => {
    const user = firebase.auth().currentUser;
    return { initializing: !user, user, claims: undefined };
  });

  async function onChange(user: firebase.User) {
    if (user) {
      const { claims: { claims } } = await user.getIdTokenResult();

      setState({ initializing: false, user, claims });
    } else {
      setState({ initializing: false, user, claims: undefined });
    }
  }

  React.useLayoutEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={state} {...props} />;
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

type State = {
  initializing: boolean;
  user: firebase.User;
  claims: {
    [x: string]: any;
  };
};

const AuthContext = React.createContext<State | undefined>(undefined);
