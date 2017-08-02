/* eslint-env jasmine */

var request = require('request');

var { testServer } = require('./helpers/testServer');

describe('All seeds', () => {

  var { url } = testServer({ seed: true });

  it('allows logging in as developer@condeforcharlotte.org', (done) => {
    request.post({
      url: url('/api/auth/login'),
      json: {
        email: 'developer@codeforcharlotte.org',
        password: 'admin'
      }
    }, function (error, response, body) {
      expect(error).toBeNull();
      expect(response.statusCode).toBe(200);
      expect(body.token).toBeTruthy();
      done();
    });
  });
});
