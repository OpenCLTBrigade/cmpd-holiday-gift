// These config settings are used for running the tests.

/* eslint no-undef: "off" */

// Listen on a random port
port = 0;

// Use a separate sqlite database for each instance
db = {
    dialect: 'sqlite',
    storage: `${run}/test/db.${process.pid}.sqlite`,
    logging: false
};

// Disabled un-needed features
useCompression = false;
enableHotReload = false;
verboseSeed = false;
verboseAccessLog = false;
verbose = false;
buildAssets = false;

