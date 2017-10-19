// Before running this app, copy this file to env.js and edit the
// settings. Any setting from `config/env.default.js' can be modified here.

// @flow

module.exports = (config /*: * */) => { // eslint-disable-line

// **** Sample Email Settings (SMTP) ****

//config.email.smtp = {
//  host: 'smtp.mailtrap.io',
//  port: 2525,
//  auth: {
//    user: '',
//    pass: ''
//  }
//}

// **** Sample Email Settings (Amazon SES) ****

config.email.ses = {
 accessKeyId: process.env.AWS_ACCESS_KEY_ID,
 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};

// **** Sample MySQL Database ****

config.db = {
 dialect: 'mariadb',
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_DATABASE
};

// **** Sample Production Mode Settings ****

//config.databaseEncryptionKey = 'change me';
//config.jwtSecrets.auth = 'changeme';
//config.jwtSecrets.nominations = 'changeme';
//config.verboseAccessLog = false;
//config.useCompression = false;
//config.verboseSeed = false;
//config.email.fromAddress = 'noreply@codeforcharlotte.org';
//config.email.fromName = 'noreply';
//config.email.adminAddress = 'info@codeforcharlotte.org';

};
