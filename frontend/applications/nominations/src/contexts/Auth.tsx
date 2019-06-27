import React, { useContext } from 'react';
import firebase from 'firebase';

export function AuthProvider(props) {
  const [state, setState] = React.useState(() => {
    const user = firebase.auth().currentUser;
    return { initializing: !user, user };
  });
  function onChange(user) {
    setState({ initializing: false, user });
  }

  React.useEffect(() => {
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
};

const AuthContext = React.createContext<State | undefined>(undefined);
