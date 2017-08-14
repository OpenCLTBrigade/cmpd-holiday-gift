// @flow
var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
var config = require('../../config');
var process = require('process');
var fs = require('fs');
var mustache = require('mustache');
var path = require('path');

// TODO: emails sent should be standardized and mention the project name

interface Transporter {
  sendMail({
    from: string,
    to: string,
    subject: string,
    html: string
  }, (any, any) => mixed): Promise<mixed>
}

function testTransporter(cb: {email: string} => void): Transporter {
  return nodemailer.createTransport({
    name: 'print',
    version: '1.0.0',
    send: (mail, callback) => {
      var message = '';
      var pipe = mail.message.createReadStream();
      pipe.setEncoding('utf8');
      pipe.on('data', chunk => {
        message += chunk;
      });
      pipe.on('end', () => {
        cb({ email: message });
        callback(null, true);
      });
    }
  });
}

var defaultTransporter: Transporter;
if (config.email.ses) {
  defaultTransporter = nodemailer.createTransport(ses(config.email.ses));
} else if (config.email.smtp) {
  defaultTransporter = nodemailer.createTransport(config.email.smtp);
} else if (config.mode === 'testing' && process.send) {
  defaultTransporter = testTransporter(process.send.bind(process));
} else {
  console.warn('Warning: email is not configured');
  defaultTransporter = nodemailer.createTransport({
    name: 'print',
    version: '1.0.0',
    send: (mail, callback) => {
      process.stdout.write('New mail:\n');
      let input = mail.message.createReadStream();
      input.pipe(process.stdout);
      input.on('end', () => callback(null, true));
    }
  });
}

async function loadTemplate(dir: string, name: string): Promise<Object => {subject: string, contents: string}> {
  var data: string = await new Promise((ok, fail) => {
    fs.readFile(
      path.join(dir, `${name}.mail`),
      'utf8',
      (err, data) => err ? fail(err) : ok(data));
  });
  var [headers, ...contents] = data.split('\n\n');
  contents = contents.join('\n\n');
  var subjectMatch = headers.match(/^subject: (.*)$/i);
  var subject = subjectMatch ? subjectMatch[1] : 'No subject';
  return data => ({
    subject: mustache.render(subject, data),
    contents: mustache.render(contents, data)
  });
}

var globalCache: Object = {};

function mailer(
  templatesPath: string,
  transporter: Transporter = defaultTransporter
): (string, Object) => Promise<void> {
  if (!globalCache[templatesPath]) {
    globalCache[templatesPath] = {};
  }
  var cache = globalCache[templatesPath];
  return async (templateName: string, data: Object) => {
    if (!cache[templateName] || config.enableHotReload) {
      cache[templateName] = await loadTemplate(templatesPath, templateName);
    }
    var message = cache[templateName](data);
    await new Promise((ok, fail) => transporter.sendMail({
      from: data.from || config.email.fromAddress,
      to: data.to,
      subject: message.subject,
      html: message.contents
    }, (err, res) => err ? fail(err) : ok(res)));
  };
}

mailer.testTransporter = testTransporter;

module.exports = mailer;
