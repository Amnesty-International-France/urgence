const { crud } = require('co-postgres-queries');

const query = require('../db/client');

const columns = ['id', 'created_on', 'updated_on', 'firstname', 'lastname', 'email', 'phone'];

const activistCrudQueries = crud({
    table: 'activist',
    writableCols: columns,
    returnCols: columns,
});

export const getActivist = async id => query(activistCrudQueries.selectOne(id));

export const getActivists = async ({ perPage, page, sortField, sortOrder }) =>
    query(
        activistCrudQueries.select({
            limit: perPage,
            offset: page * perPage,
            sort: sortField,
            sortDir: sortOrder,
        }),
    );

export const countActivists = async () => query(activistCrudQueries.countAll());

export const createActivist = async activist => query(activistCrudQueries.insertOne(activist));
