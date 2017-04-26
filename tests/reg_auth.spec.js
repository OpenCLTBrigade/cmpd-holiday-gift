// Registration and Authentication tests

var request = require('request');
base_url = 'http://localhost:3000';

describe('Register & Authenticate tests', function () {

  describe('Register test', function() {
    it('should redirect to /', function(done) {
      request.post(
        base_url + '/register',
        {form:{
          email:'test5@example.com',
          firstname: 'Test',
          lastname: 'User',
          password: 'testuser123'
        }},
        function(error, response, body) {
          expect(response.headers.location).toBe('/');
          done();
      });
    });
  });

  describe('Login test', function () {
    it('should redirect to /', function (done) {
      request.post(
        base_url + '/login',
        {form:{
          email: 'test5@example.com',
          password: 'testuser123'
        }},
        function(error, response, body) {
          expect(response.headers.location).toBe('/');
          done();
        });
      });
    });
});
