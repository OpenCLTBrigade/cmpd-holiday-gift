// Registration and Authentication tests

var request = require('request');
base_url = 'http://localhost:3000';

describe('Register & Authenticate tests', function () {

  describe('Register test', function() {
    it('should redirect to /', function(done) {
      request.post({
        url: base_url + '/register',
        formData: {
          email:'developer@codeforcharlotte.org',
          firstname: 'Developer',
          lastname: 'Lastname',
          password: 'admin'
        },
      },
      function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

  describe('Login test', function () {
    it('should redirect to /', function (done) {
      agent
      .post('/login')
      .field('email', 'developer@codeforcharlotte.org')
      .field('password', 'admin')
      .expect('Location','/')
      .end(done)
    });
  });
});
