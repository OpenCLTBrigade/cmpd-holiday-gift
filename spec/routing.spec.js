// Routing tests

/* eslint-env jasmine */

var request = require('request');
var base_url = 'http://localhost:3000';

describe('Routing Test', function () {
    describe('GET Login', function () {
        it('returns status code 200', function (done) {
            request.get(base_url + '/login', function (error, response, _body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('GET Register', function () {
        it('returns status code 200', function (done) {
            request.get(base_url + '/register', function (error, response, _body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});
