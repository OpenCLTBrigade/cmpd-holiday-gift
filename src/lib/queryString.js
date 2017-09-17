// @flow
import * as querystring from 'querystring';

/**
 * @return {Object}
 */
function parse(): Object {
  return querystring.parse(window.location.search.substr(1));
}

function update(queryParams: Object) {
  let newUrl = `${window.location.pathname}?`;

  console.log('qs');
  const keys = Object.keys(queryParams);

  for (const key: string of keys) {
    newUrl += `${key}=${queryParams[key]}&`;
  }

  window.history.replaceState({}, '', newUrl);
}

export { parse, update };
