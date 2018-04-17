const { crud } = require('co-postgres-queries');

const query = require('../db/client');

const urgentActionCrudQueries = crud({
    table: 'urgent_action',
    writableCols: ['id', 'title'],
    returnCols: ['id', 'title'],
});

const getUrgentActions = async () => query(urgentActionCrudQueries.select({
    limit: 10,
    offset: 0,
}));

const getUrgentAction = async (id) => query(urgentActionCrudQueries.selectOne(id));

const insertUrgentAction = async (urgentAction) => query(urgentActionCrudQueries.insertOne(urgentAction));

module.exports = {
    getUrgentAction,
    getUrgentActions,
    insertUrgentAction,
};


