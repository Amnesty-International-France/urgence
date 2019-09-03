const { crud } = require('co-postgres-queries');

const query = require('../db/client');

const columns = ['id', 'created_on', 'updated_on', 'type', 'content'];

const settingsCrudQueries = crud({
    table: 'settings',
    writableCols: columns,
    returnCols: columns,
});

export const getSetting = async id => query(settingsCrudQueries.selectOne(id));

export const getSettings = async ({ perPage, page, sortField, sortOrder }) =>
    query(
        settingsCrudQueries.select({
            limit: perPage,
            offset: page * perPage,
            sort: sortField,
            sortDir: sortOrder,
        }),
    );

export const countSettings = async () => query(settingsCrudQueries.countAll());

export const createSetting = async setting => query(settingsCrudQueries.insertOne(setting));

export const removeSetting = async id => query(settingsCrudQueries.removeOne(id));
