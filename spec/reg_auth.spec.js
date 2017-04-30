// Registration and Authentication tests

/* eslint-env jasmine */

var request = require('request');

var db = require('../models');

var base_url = 'http://localhost:3000';

var sampleUser = {
    email: 'test.user@example.com',
    firstname: 'Test',
    lastname: 'User',
    password: 'testuser123'
};

describe('Register & Authenticate tests', function () {

    describe('Register test', function () {
        it('should redirect to /', function (done) {
            request.post({
                url: base_url + '/register',
                form: sampleUser
            }, function (error, response, _body) {
                expect(error).toBeNull();
                expect(response.headers.location).toBe('/');
                done();
            });
        });
    });

    describe('Login test', function () {
        it('should redirect to /', function (done) {
            request.post({
                url: base_url + '/login',
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

    afterAll(function (done) {
        db.sequelize.query(`DELETE FROM users WHERE email = '${sampleUser.email}'`)
            .spread(function (_results, _metadata) {
                done();
            });
    });
});
