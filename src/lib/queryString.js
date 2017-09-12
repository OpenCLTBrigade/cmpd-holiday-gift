import * as queystring from 'querystring';

function parse (): Object {
  return querystring.parse(window.location.search.substr(1));
}

function update (queryParams: Object) {
  let newUrl = `${window.location.protocol}//${window.location.hostname}?`;

  let keys = Object.keys(queryParams);
  
  for (let key: string of keys) {
    newUrl += `${key}=${keys[key]}&`;
  }

  window.location.replaceState({}, '', newUrl);
}