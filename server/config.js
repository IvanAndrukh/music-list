const secureEnv = require('secure-env');

const envConfig = secureEnv({ secret: process.env.MUSIC_LIST_ENV_KEY });

module.exports = {
	databaseUrl: 'mongodb://127.0.0.1:27018/music-list-db',
	jwtSecret: envConfig.JWT_SECRET
};