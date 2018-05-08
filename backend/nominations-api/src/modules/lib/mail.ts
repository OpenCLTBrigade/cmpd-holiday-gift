const nodemailer = require('nodemailer');
const ses = require('nodemailer-ses-transport');
import config from '../../config';
const fs = require('fs');
const mustache = require('mustache');
import * as path from 'path';

// TODO: emails sent should be standardized and mention the project name

function testTransporter(cb: ({ email }) => void) {
  return nodemailer.createTransport({
    name: 'print',
    version: '1.0.0',
    send: (mail, callback) => {
      let message = '';
      const pipe = mail.message.createReadStream();
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

let defaultTransporter;
if (config.email.ses) {
  defaultTransporter = nodemailer.createTransport(ses(config.email.ses));
} else if (config.email.smtp) {
  defaultTransporter = nodemailer.createTransport(config.email.smtp);
} else if (config.mode === 'testing' && process.send) {
  defaultTransporter = testTransporter(process.send.bind(process));
} else {
  if (config.mode !== 'testing') {
    console.warn('Warning: email is not configured');
  }
  defaultTransporter = nodemailer.createTransport({
    name: 'print',
    version: '1.0.0',
    send: (mail, callback) => {
      process.stdout.write('New mail:\n');
      const input = mail.message.createReadStream();
      input.pipe(process.stdout);
      input.on('end', () => callback(null, true));
    }
  });
}

async function loadTemplate(dir, name) {
  const data: any = await new Promise((ok, fail) => {
    fs.readFile(path.join(dir, `${name}.mail`), 'utf8', (err, data) => (err ? fail(err) : ok(data)));
  });
  const [headers, ...contentsArray] = data.split('\n\n');
  const contents = contentsArray.join('\n\n');
  const subjectMatch = headers.match(/^subject: (.*)$/i);
  const subject = subjectMatch ? subjectMatch[1] : 'No subject';
  return data => ({
    subject: mustache.render(subject, data),
    contents: mustache.render(contents, data)
  });
}

const globalCache: Object = {};

function mailer(templatesPath, transporter = defaultTransporter): (string, Object) => Promise<void> {
  if (!globalCache[templatesPath]) {
    globalCache[templatesPath] = {};
  }
  const cache = globalCache[templatesPath];
  return async (templateName, data: any) => {
    if (!cache[templateName] || config.enableHotReload) {
      cache[templateName] = await loadTemplate(templatesPath, templateName);
    }
    const message = cache[templateName](data);
    await new Promise((ok, fail) =>
      transporter.sendMail(
        {
          from: data.from || config.email.fromAddress,
          to: data.to,
          subject: message.subject,
          html: message.contents
        },
        (err, res) => (err ? fail(err) : ok(res))
      )
    );
  };
}

mailer['testTransporter'] = testTransporter;

module.exports = mailer;
