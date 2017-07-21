// @flow
import axios from 'axios';

// Axios config object
type RequestConfigType = {
  baseURL: string,
  headers?: Object,
  params?: Object,
  headers?: Object
};

/**
 * Default axios config object
 * @type {RequestConfigType}
 */
let _requestConfig: RequestConfigType = {
  baseURL: `${window.location.protocol}//${window.location.hostname}/api/`
};

/**
 * What to do with the request before handing it back to the calling object
 * @param  {Object}   response Request response
 * @param  {Function} next     resolve(data)
 */
const preProcessResponse = function(response: Object, next) {
  next(response.data);
};

/**
 * What to do with the error before handing it back to the calling object
 * @param  {Object}   err
 * @param  {Function} next     reject(error)
 */
const preProcessError = function(err: Object, next) {
  next(err);
};

const makeRequest = function(method: string, url: string, data: ?Object = null, config: Object = {}) {
  config.url = url;
  config.method = method.toLowerCase();

  if (data !== null) {
    if (config.method === 'get' || config.method === 'delete') {
      config.params = data;
    } else {
      config.data = data;
    }
  }

  let requestConfig: RequestConfigType = Object.assign(_requestConfig, config);
  return new Promise((resolve, reject) => {
    axios
      .request(requestConfig)
      .then(response => {
        preProcessResponse(response, resolve);
      })
      .catch(err => {
        preProcessError(err, reject);
      });
  });
};

let apiService = {
  get: function get(url: string, data: ?Object = null, config: RequestConfigType): Promise<any> {
    return makeRequest('get', url, data, config);
  },

  post: function post(url: string, data: ?Object = null, config: RequestConfigType): Promise<any> {
    return makeRequest('get', url, data, config);
  },

  put: function put(url: string, data: ?Object = null, config: RequestConfigType): Promise<any> {
    return makeRequest('get', url, data, config);
  },

  delete: function del(url: string, data: ?Object = null, config: RequestConfigType): Promise<any> {
    return makeRequest('get', url, data, config);
  }
};

export { apiService };
