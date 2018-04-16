const select = require('co-postgres-queries/queries/select');

const client = require('../db/client');

const getUrgentActions = async (client) => client.query(`
    SELECT id, title
    FROM urgent_action
`);

const truncate = async (client) => client.query(`TRUNCATE urgent_action`);

module.exports = {
    getUrgentActions,
    truncate,
};
