import { post } from '../lib/apiService';
import jwt_decode from 'jwt-decode';
import { render } from 'react-dom';
import * as React from 'react';

const authTokenRefreshWhenSecondsLeft = 6 * 60 * 60; // 6 hours
const minRefreshInterval = 1 * 60; // 1 minutes
const appTokenMinRemainingTime = 15; // seconds

const localStorage = window.localStorage;

// A wrapper around the auth token
// The token is automatically refreshed and expired
// The token is stored in the localStorage under 'authToken'
export const AuthToken = (() => {
  let token; // Cached JWT string
  let expirationTime; // Cached exp
  let refreshing = false; // Flag to avoid concurrent refresh
  const handlers: (('login' | 'logout') => void)[] = [];
  let status = 'logout';

  // Load token from localStorage
  // Should be called only on page load and by getAuthorization
  function load() {
    token = localStorage.getItem('authToken');
    if (!token) {
      expirationTime = 0;
    } else {
      try {
        expirationTime = jwt_decode(token).exp;
      } catch (err) {
        console.log('Failed to decode stored auth token', err);
        token = null;
        expirationTime = 0;
      }
    }
    triggerHandlers();
  }

  function setToken(t) {
    if (t) {
      localStorage.setItem('authToken', t);
    } else {
      localStorage.removeItem('authToken');
    }
    token = t;
    if (token) {
      expirationTime = jwt_decode(token).exp;
    } else {
      expirationTime = 0;
    }
    triggerHandlers();
  }

  async function getToken() {
    load();
    maybeRefreshOrExpire();
    return token;
  }

  // Returns an up-to-date authorization header, or the empty string
  async function getAuthorization() {
    await getToken();
    if (token) {
      return `Bearer ${token}`;
    } else {
      return '';
    }
  }

  function maybeRefreshOrExpire() {
    if (shouldExpire()) {
      expire();
    } else if (shouldRefresh()) {
      backgroundRefresh();
    }
  }

  function shouldExpire() {
    return expirationTime < Date.now() / 1000;
  }

  function shouldRefresh() {
    return expirationTime - Date.now() / 1000 < authTokenRefreshWhenSecondsLeft;
  }

  function expire() {
    if (token) {
      setToken(null);
    }
  }

  function expired() {
    return shouldExpire();
  }

  // Obtain a new token from the server
  function backgroundRefresh() {
    if (refreshing) {
      return;
    }
    refreshing = true;
    post('auth', 'extend')
      .then(res => {
        setToken(res.token);
        refreshing = false;
      })
      .catch(err => {
        console.log(`Error refreshing auth token: ${err}`);
        setTimeout(() => {
          refreshing = false;
        }, minRefreshInterval * 1000);
      });
  }

  async function login(email, password) {
    const res = await post('auth', 'login', { email, password });
    if (res.failed) {
      return false;
    } else {
      setToken(res.token);
      return true;
    }
  }

  function logout() {
    setToken(null);
  }

  function addHandler(cb) {
    handlers.push(cb);
    return () => {
      const i = handlers.indexOf(cb);
      if (i !== -1) {
        handlers.splice(i, 1);
      }
    };
  }

  function triggerHandlers() {
    const newStatus = token ? 'login' : 'logout';
    if (status !== newStatus) {
      status = newStatus;
      for (const handler of handlers) {
        handler(status);
      }
    }
  }

  load();
  return {
    login,
    logout,
    expired,
    getToken,
    getAuthorization,
    addHandler,
    token
  };
})();

export const AppToken = (() => {
  const tokens = {};

  async function getToken(app) {
    try {
      const res = await post('auth', 'access', { app });
      return res.token;
    } catch (exc) {
      console.log(`Error retrieving app token: ${exc}`);
      throw exc;
    }
  }

  async function getAuthorization(app) {
    if (AuthToken.expired()) {
      return '';
    }
    if (!tokens[app]) {
      tokens[app] = getToken(app);
    }
    let token;
    try {
      token = await tokens[app];
    } catch (exc) {
      tokens[app] = null;
      AuthToken.logout();
      throw exc;
    }
    if (
      !token ||
      jwt_decode(token).exp < Date.now() / 1000 - appTokenMinRemainingTime
    ) {
      tokens[app] = getToken(app);
      token = await tokens[app];
    }
    return `Bearer ${token}`;
  }

  return { getAuthorization };
})();

export function getAuthorization(app) {
  if (app === 'auth') {
    return AuthToken.getAuthorization();
  } else {
    return AppToken.getAuthorization(app);
  }
}

export async function redirectPostWithAuth(app, path) {
  const authorization = await getAuthorization(app);
  const div = document.createElement('div');
  document.body.appendChild(div);
  const form = render(
    <form
      style={{ display: 'none' }}
      method="POST"
      action={`/api/${app}/${path}`}
      target="_blank">
      <input type="hidden" name="__authorization" value={authorization} />
    </form>,
    div
  );
  form.submit();
}

// type RegisterResult = {| error: string |} | {| success: true |};

// Registers user after user submits information for new user in registration form
export async function register(
  name_first,
  name_last,
  rank = '',
  affiliation_id,
  email,
  password
) {
  return await post('auth', 'register', {
    firstname: name_first,
    lastname: name_last,
    rank: rank,
    affiliation: affiliation_id,
    email: email,
    password: password
  });
}
