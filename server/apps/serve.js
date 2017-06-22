/*eslint no-console: "off"*/

var process = require('process');

var loadApp = require('.');
var config = require('../config');
var seed = require('../seeds/');

(async () => {
    if (process.env.SEED_ON_START === 'true') {
        await seed();
    }

    var app = await loadApp;

    var listener = app.listen(config.port, () => {
        var port = listener.address().port;
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
