const select = require('co-postgres-queries/queries/select');

const client = require('../db/client');

const getUrgentActions = async (client) => client.query(`
    SELECT id, title
    FROM urgent_action
`);

module.exports = {
    getUrgentActions,
};
