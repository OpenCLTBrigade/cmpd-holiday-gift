// @flow

import {post} from 'lib/apiService'
import jwt_decode from 'jwt-decode'

const authTokenRefreshWhenSecondsLeft = 6 * 60 * 60; // 6 hours
const minRefreshInterval = 1 * 60; // 1 minutes
const appTokenMinRemainingTime = 15; // seconds

const localStorage = window.localStorage;



// A wrapper around the auth token
// The token is automatically refreshed and expired
// The token is stored in the localStorage under 'authToken'
export const AuthToken = (() => {

  var token; // Cached JWT string
  var expirationTime; // Cached exp
  var refreshing = false; // Flag to avoid concurrent refresh

  // Load token from localStorage
  // Should be called only on page load and by getAuthorization
  function load() {
    token = localStorage.getItem('authToken');
    console.log('TODO ATN auth loaded from cache', token);
    if (!token) {
      expirationTime = 0;
    } else {
      try {
        expirationTime =  jwt_decode(token).exp;
      } catch(err) {
        console.log('Failed to decode stored auth token', err);
        token = null;
        expirationTime = 0;
      }
    }
  }

  function setToken(t) {
    console.log('TODO ATN auth set', t);
    if (t) {
      localStorage.setItem('authToken', t);
    } else {
      localStorage.removeItem('authToken');
    }
    token = t;
    if (token) {
      expirationTime =  jwt_decode(token).exp;
    } else {
      expirationTime = 0;
    }
  }

  // Returns an up-to-date authorization header, or the empty string
  async function getAuthorization() {
    load();
    maybeRefreshOrExpire();
    console.log('TODO ATN auth get', token);
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
    return expirationTime < Date.now()/1000;
  }

  function shouldRefresh() {
    return expirationTime - Date.now()/1000 < authTokenRefreshWhenSecondsLeft;
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
    console.log('TODO ATN auth bg refresh start');
    post('auth', 'extend').then(res => {
      console.log('TODO ATN auth bg refresh success', token);
      setToken(res.token);
      refreshing = false;
    }).catch(err => {
      console.log(`Error refreshing auth token: ${err}`);
      setTimeout(() => { refreshing = false; }, minRefreshInterval * 1000);
    });
  }

  async function login(email: string, password: string): Promise<bool> {
    var res = await post('auth', 'login', {email, password});
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

  load();
  return {login, logout, expired, getAuthorization};
})()

export const AppToken = (() => {

  var tokens = {};

  async function getToken(app) {
    try {
      console.log('TODO ATN app get start');
      var res = await post('auth', 'access', {app});
      console.log('TODO ATN app got', res);
      return res.token;
    } catch(exc) {
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
    var token = await tokens[app];
    if (!token || jwt_decode(token).exp > Date.now()/1000 - appTokenMinRemainingTime) {
      tokens[app] = getToken(app);
      token = await tokens[app];
    }
    return `Bearer ${token}`;
  }

  return {getAuthorization};
})()

export function getAuthorization(app) {
  if (app === 'auth') {
    return AuthToken.getAuthorization();
  } else {
    return AppToken.getAuthorization(app);
  }
}

// TODO ATN
window.AuthToken = AuthToken;
window.AppToken = AppToken;
window.jwt_decode = jwt_decode;
