// Before running this app, copy this file to env.js and edit the
// settings. Any setting from `config/env.default.js' can be modified here.


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
 accessKeyId: process.env.SES_AWS_ACCESS_KEY_ID,
 secretAccessKey: process.env.SES_AWS_SECRET_ACCESS_KEY,
 region: process.env.SES_AWS_REGION
};

// **** Sample MySQL Database ****

config.db = {
 dialect: 'mysql',
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_DATABASE
};

// **** Sample Production Mode Settings ****

config.databaseEncryptionKey = process.env.DB_ENCRYPTION_KEY;
config.jwtSecrets.auth = process.env.JWT_SECRETS_AUTH;
config.jwtSecrets.nominations = process.env.JWT_SECRETS_NOMINATIONS;
//config.verboseAccessLog = false;
//config.useCompression = false;
//config.verboseSeed = false;

config.email.fromAddress = process.env.EMAIL_FROM_ADDRESS;
config.email.fromName = 'noreply';
config.email.adminAddress = process.env.EMAIL_ADMIN_ADDRESS;

};
