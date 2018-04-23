const { crud } = require('co-postgres-queries');

const query = require('../db/client');

const urgentActionCrudQueries = crud({
    table: 'urgent_action',
    writableCols: ['id', 'title', 'story', 'creation_date', 'last_edition_date'],
    returnCols: ['id', 'title', 'story', 'creation_date', 'last_edition_date'],
});

export const getUrgentActions = async ({ perPage, page, sortField, sortOrder }) => query(urgentActionCrudQueries.select({
    limit: perPage,
    offset: page * perPage,
    sort: sortField,
    sortDir: sortOrder,
}));

export const countUrgentActions = async () => query(urgentActionCrudQueries.countAll());

export const getUrgentAction = async (id) => query(urgentActionCrudQueries.selectOne(id));

export const createUrgentAction = async (urgentAction) => query(urgentActionCrudQueries.insertOne(urgentAction));
export const updateUrgentAction = async (id, urgentAction) => query(urgentActionCrudQueries.updateOne(id, urgentAction));
export const removeUrgentAction = async (id) => query(urgentActionCrudQueries.removeOne(id));
