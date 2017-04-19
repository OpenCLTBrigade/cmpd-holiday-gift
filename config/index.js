var config = {
	local: {
		mode: 'local',
		port: process.env.PORT || 3000,
		mysql: {
			host: 'localhost',
			user: 'expressuser',
			password: 'express123',
			database: 'expresstest'
		}
	}
}
module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
}
