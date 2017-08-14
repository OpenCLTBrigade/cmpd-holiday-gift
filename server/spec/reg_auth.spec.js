// Registration and Authentication tests

/* eslint-env jasmine */

var request = require('request');
var quoted_printable = require('quoted-printable');

var { testServer } = require('./helpers/testServer');

var sampleUser = {
  email: 'test.user@example.com',
  firstname: 'Test',
  lastname: 'User',
  password: 'testuser123'
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Authentication tests', () => {

  var { url, nextEvent, openDB } = testServer({ mode: 'all' });
  var db;
  var user;
  var confirmation_code;

  describe('Register test', function () {
    it('should be successful', function (done) {
      request.post({
        url: url('/api/auth/register'),
        json: sampleUser
      }, async function (error, response, body) {
        expect(error).toBeNull();
        expect(body.error).toBe(undefined);
        expect(response.statusCode).toBe(200);
        expect(body.success).toBe(true);
        db = openDB();
        user = await db.user.find({ where: { email: sampleUser.email } });
        expect(user).not.toBeNull();
        done();
      });
    });

    it('should send an email to the user', done => {
      nextEvent().then(event => {
        var [headers, ...parts] = event.email.split('\r\n\r\n');
        var message = parts.join('\r\n\r\n');
        if (headers.match(/Content-Transfer-Encoding: quoted-printable/i)) {
          message = quoted_printable.decode(message);
        }
        expect(headers).toContain(`To: ${sampleUser.email}`);
        confirmation_code = message.match(/confirmation_code=(.*?)"/)[1];
        done();
      });
    });

    it('confirmation step', done => {
      request.post({
        url: url('/api/auth/confirm_email'),
        json: { id: user.id, confirmation_code }
      }, async function (error, response, body) {
        expect(error).toBeNull();
        expect(body.error).toBe(undefined);
        expect(response.statusCode).toBe(200);
        expect(body.success).toBe(true);
        await user.reload();
        expect(user.email_verified).toBe(true);
        done();
      });
    });

    it('should send an email to the admin', done => {
      nextEvent().then(event => {
        expect(event.email).toContain('To:');
        done();
      });
    });

    it('should allow approving the user', done => {
      request.post({
        url: url('/api/auth/approve'),
        json: { user_id: user.id }
      }, async function (error, response, body) {
        expect(error).toBeNull();
        expect(body.error).toBe(undefined);
        expect(response.statusCode).toBe(200);
        expect(body.success).toBe(true);
        await user.reload();
        expect(user.approved).toBe(true);
        expect(user.active).toBe(true);
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
    it('nomination app token', function (done) {
      request.post({
        url: url('/api/auth/access'),
        json: { app: 'nominations' },
        headers: { authorization: `Bearer ${authToken}` }
      }, function (error, response, body) {
        expect(error).toBeNull();
        expect(response.statusCode).toBe(200);
        expect(body.token).toBeTruthy();
        done();
      });
    });
  });
});
