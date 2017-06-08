// Routing tests

/* eslint-env jasmine */

var request = require('request');

var {testServer} = require('./helpers/testServer');


describe('Routing Test', function () {

    var {url} = testServer({mode: 'all'});

    describe('GET Login', function () {
        it('returns status code 200', function (done) {
            request.get(url('/login'), function (error, response, _body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    describe('GET Register', function () {
        it('returns status code 200', function (done) {
            request.get(url('/register'), function (error, response, _body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});
