// Registration and Authentication tests

/* eslint-env jasmine */

var request = require('request');

var { testServer } = require('./helpers/testServer');

var sampleUser = {
  email: 'test.user@example.com',
  firstname: 'Test',
  lastname: 'User',
  password: 'testuser123'
};

describe('Authentication tests', () => {

  var { url, server } = testServer({ mode: 'all' });

  describe('Register test', function () {
    it('should be successful', function (done) {
      request.post({
        url: url('/api/auth/register'),
        json: sampleUser
      }, function (error, response, body) {
        expect(error).toBeNull();
        expect(body.error).toBe(undefined);
        expect(response.statusCode).toBe(200);
        expect(body.success).toBe(true);
        done();
      });
    });
    it('should send an email to the user', done => {
      server().once('message', event => {
        expect(event.email).toContain(`To: ${sampleUser.email}`);
        done();
      });
    });
  });

  describe('Requesting tokens:', function () {
    var authToken;
    it('auth token', function (done) {
      request.post({
        url: url('/api/auth/login'),
        json: {
          email: sampleUser.email,
          password: sampleUser.password
        }
      }, function (error, response, body) {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        expect(body.token).toBeTruthy();
        authToken = body.token;
        done();
      });
    });
    it('nomination app token', function(done) {
      request.post({
        url: url('/api/auth/access'),
        json: {app: 'nominations'},
        headers: {
          authorization: `Bearer ${authToken}`
        }
      }, function(error, response, body) {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        expect(body.token).toBeTruthy();
        done();
      });
    });
  });
});
