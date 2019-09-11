const { crud, selectOne } = require('co-postgres-queries');

const query = require('../db/client');

const columns = [
    'id',
    'title',
    'slug',
    'campaign_code',
    'origin_code',
    'story',
    'call_to_action',
    'object_indication',
    'message_template',
    'recipient',
    'email_thank',
    'register',
    'end_thank',
    'creation_date',
    'last_edition_date',
];

const urgentActionCrudQueries = {
    ...crud({
        table: 'urgent_action',
        writableCols: columns,
        returnCols: columns,
    }),
    selectOneBySlug: selectOne({
        table: 'urgent_action',
        primaryKey: 'slug',
        returnCols: columns,
    }),
    selectDefault: select({
        table: 'urgent_action',
        primaryKey: 'id',
        returnCols: columns,
        returnOne: true,
    }),
};

export const getUrgentActions = async ({ perPage, page, sortField, sortOrder }) =>
    query(
        urgentActionCrudQueries.select({
            limit: perPage,
            offset: page * perPage,
            sort: sortField,
            sortDir: sortOrder,
        }),
    );

export const countUrgentActions = async () => query(urgentActionCrudQueries.countAll());

export const getUrgentAction = async id => query(urgentActionCrudQueries.selectOne(id));

export const getDefaultUrgentAction = async () =>
    query(
        urgentActionCrudQueries.selectDefault({
            filter: {
                is_default: true,
            },
        }),
    );

export const getUrgentActionBySlug = async slug =>
    query(urgentActionCrudQueries.selectOneBySlug(slug));

export const createUrgentAction = async urgentAction =>
    query(urgentActionCrudQueries.insertOne(urgentAction));

export const updateUrgentAction = async (id, urgentAction, last_edition_date = new Date()) =>
    query(
        urgentActionCrudQueries.updateOne(id, {
            ...urgentAction,
            last_edition_date,
        }),
    );
export const removeUrgentAction = async id => query(urgentActionCrudQueries.removeOne(id));
