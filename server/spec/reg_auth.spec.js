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
    it('should redirect to /', function (done) {
      request.post({
        url: url('/register'),
        form: sampleUser
      }, function (error, response, _body) {
        expect(error).toBeNull();
        expect(response.headers.location).toBe('/');
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

  describe('Login test', function () {
    it('should redirect to /', function (done) {
      request.post({
        url: url('/login'),
        form: {
          email: sampleUser.email,
          password: sampleUser.password
        }
      }, function (error, response, _body) {
        expect(error).toBeNull();
        expect(response.headers.location).toBe('/');
        done();
      });
    });
  });
});
