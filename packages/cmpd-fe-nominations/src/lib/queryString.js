import * as querystring from 'querystring';

/**
 * @return {Object}
 */
function parse() {
  return querystring.parse(window.location.search.substr(1));
}

function update(queryParams) {
  let newUrl = `${window.location.pathname}?`;

  console.log('qs');
  const keys = Object.keys(queryParams);

  for (const key of keys) {
    newUrl += `${key}=${queryParams[key]}&`;
  }

  window.history.replaceState({}, '', newUrl);
}

export { parse, update };
