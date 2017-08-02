/* eslint-env jasmine */

var { asyncTest } = require('./helpers/asyncTest');
var mailer = require('../apps/lib/mail.js');
var config = require('../config');

var sendMail = cb => mailer(__dirname + '/helpers/templates', mailer.testTransporter(cb));

describe('Sending test e-mail', function () {
  it('should work', asyncTest(async function () {
    var text = 'lorem ipsum dolor sit amet';
    var message = await new Promise(ok => sendMail(ok)('test', {
      to: 'test@example.com',
      text
    }));
    expect(message.email).toContain(text);
    expect(message.email).toMatch(/to: test@example.com/i);
  }));
});
