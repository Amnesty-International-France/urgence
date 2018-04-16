const PgPool = require('co-postgres-queries');

const config = require('../../../config');

const pool = new PgPool.default(config.db);

module.exports = pool.connect;
