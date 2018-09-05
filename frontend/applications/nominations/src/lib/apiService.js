import wretch from 'wretch';

const api = wretch()
  .url(process.env.API_URL || 'http://localhost:3002/api')
  .auth(`Bearer ${localStorage.getItem('authToken')}`);

/*
 * Exported methods shouldn't be used directly from a component; use
 * one of the actual API libs instead.
 */

export function get(app, path, data = null, config = {}) {
  return api
    .url(`/${app}/${path}`)
    .query(data)
    .get()
    .json();
}

export function post(app, path, data = null, config = {}) {
  return api
    .url(`/${app}/${path}`)
    .post(data)
    .json();
}

export function put(app, path, data = null, config = {}) {
  return api
    .url(`/${app}/${path}`)
    .put(data)
    .json();
}

export function delete_(app, path, data = null, config = {}) {
  return api
    .url(`/${app}/${path}`)
    .delete(data)
    .json();
}
