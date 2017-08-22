/*eslint no-console: "off"*/

const process = require('process');

const loadApp = require('.');
const config = require('../config');
const seed = require('../seeds/');

(async () => {
  if (process.env.SEED_ON_START === 'true') {
    await seed();
  }

  const app = await loadApp;

  const listener = app.listen(config.port, () => {
    const port = listener.address().port;
    if (config.verbose) {
      console.log('Express server listening on port ' + port);
    }
    if (process.send) {
      process.send({
        port,
        dbPath: config.db.storage
      });
    }
  });
})();
