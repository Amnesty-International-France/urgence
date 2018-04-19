const { crud } = require('co-postgres-queries');

const query = require('../db/client');

const urgentActionCrudQueries = crud({
    table: 'urgent_action',
    writableCols: ['id', 'title'],
    returnCols: ['id', 'title'],
});

const getUrgentActions = async ({ perPage, page, sortField, sortOrder }) => query(urgentActionCrudQueries.select({
    limit: perPage,
    offset: page * perPage,
    sort: sortField,
    sortDir: sortOrder,
}));

const countUrgentActions = async () => query(urgentActionCrudQueries.countAll());

const getUrgentAction = async (id) => query(urgentActionCrudQueries.selectOne(id));

const createUrgentAction = async (urgentAction) => query(urgentActionCrudQueries.insertOne(urgentAction));
const updateUrgentAction = async (id, urgentAction) => query(urgentActionCrudQueries.updateOne(id, urgentAction));
const removeUrgentAction = async (id) => query(urgentActionCrudQueries.removeOne(id));

module.exports = {
    getUrgentAction,
    getUrgentActions,
    countUrgentActions,
    createUrgentAction,
    updateUrgentAction,
    removeUrgentAction,
};


