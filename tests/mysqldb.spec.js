describe("MySQLDB", function() {
    it("is there a server running", function() {
      var config = require('../config')();
      var MySQLClient = require('mysql');
      var connection = MySQLClient.createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
        database: config.mysql.database
      });
      connection.connect(function(err) {
        expect(err).toBe(null);
      });
    });
});
