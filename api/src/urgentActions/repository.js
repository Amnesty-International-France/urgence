const { crud } = require('co-postgres-queries');

const urgentActionCrudQueries = crud({
    table: 'urgent_action',
    writableCols: ['id', 'title'],
    returnCols: ['id', 'title'],
});

const getUrgentActions = async (client) => client.query(urgentActionCrudQueries.select({
    limit: 10,
    offset: 0,
}));

const insertUrgentAction = async (client, urgentAction) => client.query(urgentActionCrudQueries.insertOne(urgentAction));

module.exports = {
    getUrgentActions,
    insertUrgentAction,
};
