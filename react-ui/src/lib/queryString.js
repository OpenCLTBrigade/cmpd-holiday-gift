// @flow
import * as querystring from 'querystring';
import { isNil, isEmpty, pick } from 'ramda';
/**
 * @return {Object}
 */
function parse(): Object {
  return querystring.parse(window.location.search.substr(1));
}

function update(queryParams: Object) {
  const keys = Object.keys(queryParams)
    .filter(key => !isEmpty(key))
    .filter(key => !isNil(queryParams[key]) && !isEmpty(queryParams[key]));

  const url = `${window.location.pathname}?${querystring.stringify(pick(keys, queryParams))}`;

  window.history.replaceState({}, '', url);
}

export { parse, update };
