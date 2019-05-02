const { crud, selectOne } = require('co-postgres-queries');

const query = require('../db/client');

const columns = [
    'id',
    'title',
    'slug',
    'story',
    'end_of_story_link',
    'call_to_action',
    'object_indication',
    'message_template',
    'message_link',
    'recipient',
    'email_thank',
    'letter_thank',
    'register',
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
