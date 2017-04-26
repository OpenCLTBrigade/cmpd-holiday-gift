// Registration and Authentication tests

var request = require('request');
base_url = 'http://localhost:3000';

var config = require('../config');
var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, Object.assign({
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
}, config.db));

describe('Register & Authenticate tests', function () {

  describe('Register test', function() {
    it('should redirect to /', function(done) {
      request.post(
        base_url + '/register',
        {form:{
          email:'test.user@example.com',
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
          email: 'test.user@example.com',
          password: 'testuser123'
        }},
        function(error, response, body) {
          expect(response.headers.location).toBe('/');
          done();
        });
      });
      afterEach(function(done) {
        sequelize.query("DELETE FROM users WHERE email = 'test.user@example.com'").spread(function(results, metadata) {
          
        });

        done();
      });
    });
    // TODO: add after done to run sequelize delete command
});
