const process = require('process');

const loadApp = require('./apps');
import config from './config';
const seed = require('./seeds/');

import logger from './apps/lib/logger';

(async () => {
  if (process.env.SEED_ON_START === 'true') {
    await seed();
  }

  const app = await loadApp;

  const listener = app.listen((process.env.PORT || config.port), () => {
    const port = listener.address().port;
    if (config.verbose) {
      logger.info('Express server listening on port ' + port);
    }
    if (process.send) {
      process.send({
        port,
        dbPath: config.db.storage
      });
    }
  });
})();
