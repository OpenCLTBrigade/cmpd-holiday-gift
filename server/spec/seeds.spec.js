/* eslint-env jasmine */

var request = require('request');

var { testServer } = require('./helpers/testServer');

describe('All seeds', () => {

  var { url } = testServer({ seed: true });

  it('allows logging in as developer@condeforcharlotte.org', (done) => {
    request.post({
      url: url('/login'),
      form: {
        email: 'developer@codeforcharlotte.org',
        password: 'admin'
      }
    }, function (error, response, _body) {
      expect(error).toBeNull();
      expect(response.headers.location).toBe('/');
      done();
    });
  });
});
