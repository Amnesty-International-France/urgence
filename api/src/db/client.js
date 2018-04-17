const PgPool = require('co-postgres-queries');

const config = require('../../../config');

const pool = new PgPool.default(config.db);

module.exports = async query => {
    const client = await pool.connect();

    try {
        const response = client.query(query);
        client.release();
        return response;
    } catch (err) {
        client.end();
        throw err;
    }
};
