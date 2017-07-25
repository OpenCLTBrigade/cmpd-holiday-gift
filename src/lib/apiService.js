// @flow
import axios from 'axios';

// Axios config object
type RequestConfigType = {
  baseURL?: string,
  headers?: Object,
  params?: Object,
  headers?: Object,
  url?: string,
  method?: string,
  params?: Object,
  data?: Object
};

/**
 * Default axios config object
 * @type {RequestConfigType}
 */
const _requestConfig: RequestConfigType = {
  baseURL: `${window.location.protocol}//${window.location.hostname}/api/`,
  method: 'get'
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

/**
 * [description]
 * @param  {String} method HTTP Verb
 * @param  {String} url    Endpoint to hit. No starting slash
 * @param  {Object} data   URL parameters OR post body to be sent
 * @param  {Object} config Axios configuration object
 * @return {Promise}       Promise with response.data OR error
 */
const _makeRequest = function(
  method: string,
  url: string,
  data: ?Object = null,
  config: RequestConfigType = {}
): Promise<any> {
  config.url = url;
  config.method = method.toLowerCase();

  // Set data to the post body or query string
  if (data !== null) {
    if (config.method === 'get' || config.method === 'delete') {
      config.params = data;
    } else {
      config.data = data;
    }
  }

  // Combine our passed configuration with the base configuration
  let requestConfig: RequestConfigType = Object.assign(_requestConfig, config);
  return new Promise((resolve, reject) => {
    axios
      .request(requestConfig)
      .then(response => {
        // Pre-process the response before handing it back to the calling controller
        preProcessResponse(response, resolve);
      })
      .catch(err => {
        // Pre-process the response before handing it back to the calling controller
        preProcessError(err, reject);
      });
  });
};

/**
 * Export the API service. It shouldn't be used directly from a component; use
 * one of the actual API libs instead.
 * @type {Object}
 */
let apiService = {
  get: function get(url: string, data: ?Object = null, config: RequestConfigType): Promise<any> {
    return _makeRequest('get', url, data, config);
  },

  post: function post(url: string, data: ?Object = null, config: RequestConfigType): Promise<any> {
    return _makeRequest('post', url, data, config);
  },

  put: function put(url: string, data: ?Object = null, config: RequestConfigType): Promise<any> {
    return _makeRequest('put', url, data, config);
  },

  delete: function del(url: string, data: ?Object = null, config: RequestConfigType): Promise<any> {
    return _makeRequest('delete', url, data, config);
  }
};

export { apiService };
