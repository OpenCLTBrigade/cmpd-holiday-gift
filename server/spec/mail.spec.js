/* eslint-env jasmine */

const { asyncTest } = require('./helpers/asyncTest');
const mailer = require('../apps/lib/mail.js');

const sendMail = cb =>
  mailer(__dirname + '/helpers/templates', mailer.testTransporter(cb));

describe('Sending test e-mail', function() {
  it(
    'should work',
    asyncTest(async function() {
      const text = 'lorem ipsum dolor sit amet';
      const message = await new Promise(ok =>
        sendMail(ok)('test', {
          to: 'test@example.com',
          text
        })
      );
      expect(message.email).toContain(text);
      expect(message.email).toMatch(/to: test@example.com/i);
    })
  );
});
