import wretch from 'wretch';

const api = wretch()
  .url(process.env.API_URL || 'http://localhost:3002/api')
  .auth(`Bearer ${localStorage.getItem('authToken')}`);

/*
 * Exported methods shouldn't be used directly from a component; use
 * one of the actual API libs instead.
 */

export function get(app, path, data = undefined, config = {}) {
  let request = api.url(`/${app}/${path}`);

  if (data) {
    request = request.query(data);
  }

  return request.get().res(parseResponse);
}

export function post(app, path, data = null, config = {}) {
  return api
    .url(`/${app}/${path}`)
    .post(data)
    .badRequest(parseValidationError)
    .res(parseResponse);
}

export function put(app, path, data = null, config = {}) {
  return api
    .url(`/${app}/${path}`)
    .put(data)
    .badRequest(parseValidationError)
    .res(parseResponse);
}

export function delete_(app, path, data = null, config = {}) {
  return api
    .url(`/${app}/${path}`)
    .delete(data)
    .res(parseResponse);
}

export class ValidationError extends Error {
  constructor(message, validationErrors) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.validationErrors = validationErrors;
    this.statusCode = 400;
  }
}

const isJSONResponse = response => /application\/json/.test(response.headers.get('content-type'));

const parseResponse = response => {
  if (!response.ok) {
    throw new Error(response.status + ' ' + response.statusText);
  }
  if (isJSONResponse(response)) {
    return response.json();
  }
  return response.text();
};

const parseValidationError = async ({ response, text }) => {
  if (isJSONResponse(response)) {
    const json = JSON.parse(text);

    throw new ValidationError(json.error, json.message);
  }

  throw new Error(error.text);
};
