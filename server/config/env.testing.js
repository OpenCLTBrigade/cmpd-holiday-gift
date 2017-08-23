// @flow
// These config settings are used for running the tests.

module.exports = (config: *) => {

// Listen on a random port
  config.port = 0;

// Use a separate sqlite database for each instance
  config.db = {
    dialect: 'sqlite',
    storage: `${config.run}/test/db.${config.pid}.sqlite`,
    logging: false
  };

// Disabled un-needed features
  config.useCompression = false;
  config.verboseSeed = false;
  config.verboseAccessLog = false;
  config.verbose = false;

};
