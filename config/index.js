var default_mode = "sqlite-devel";
var config = {
	"sqlite-devel": {
		mode: "local",
		port: process.env.PORT || 3000,
		db: {
			dialect: "sqlite",
			storage: "./db.development.sqlite"
		}
        },
	"mysql-devel": {
		mode: 'local',
		port: process.env.PORT || 3000,
		db: {
			dialect: "mysql",
			host: 'localhost',
			user: 'expressuser',
			password: 'express123',
			database: 'expresstest'
		}
	}
}
module.exports = function(mode) {
	return config[mode || process.argv[2] || default_mode ] || config.local;
}
