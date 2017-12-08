// Registration and Authentication tests

/* eslint-env jasmine */

const request = require('request');
const quoted_printable = require('quoted-printable');

const { testServer } = require('./helpers/testServer');
const { asyncTest } = require('./helpers/asyncTest');

const sampleUser = {
  email: 'test.user@example.com',
  firstname: 'Test',
  lastname: 'User',
  password: 'testuser123'
};

const adminUser = {
  email: 'developer@codeforcharlotte.org',
  password: 'admin'
};

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Authentication tests', () => {

  const { url, nextEvent, openDB } = testServer({ mode: 'all', seed: true });
  let db;
  let user;
  let confirmation_code;

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
        user = await db['user'].find({ where: { email: sampleUser.email } });
        expect(user).not.toBeNull();
        done();
      });
    });

    it('should send an email to the user', done => {
      nextEvent().then(event => {
        const [headers, ...parts] = event.email.split('\r\n\r\n');
        let message = parts.join('\r\n\r\n');
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

    it('should forbid approving if not logged in', done => {
      request.post({
        url: url('/api/auth/approve'),
        json: { user_id: user.id }
      }, async function (_error, response, _body) {
        expect(response.statusCode).toBe(403);
        await user.reload();
        expect(user.approved).toBe(false);
        done();
      });
    });

    it('should allow approving the user as admin', asyncTest(async () => {
      const authToken = await new Promise((ok, fail) => request.post({
        url: url('/api/auth/login'),
        json: adminUser
      }, (error, _result, body) => error ? fail(error) : ok(body.token)));
      const { response, body } = await new Promise((ok, fail) => request.post({
        url: url('/api/auth/approve'),
        json: { user_id: user.id },
        headers: { authorization: `Bearer ${authToken}` }
      }, (error, response, body) => error ? fail(error) : ok({ response, body })));
      expect(body.error).toBe(undefined);
      expect(response.statusCode).toBe(200);
      expect(body.success).toBe(true);
      await user.reload();
      expect(user.approved).toBe(true);
      expect(user.active).toBe(true);
    }));
  });

  describe('Requesting tokens:', function () {
    let authToken;
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
