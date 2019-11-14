import { crud, selectOne, select } from 'co-postgres-queries';

import query from '../db/client';

const table = 'urgent_action';
const columns = [
    'id',
    'title',
    'slug',
    'is_default',
    'campaign_code',
    'origin_code',
    'story',
    'call_to_action',
    'message',
    'email_thank',
    'register',
    'end_thank',
    'creation_date',
    'last_edition_date',
];

const urgentActionCrudQueries = {
    ...crud({
        table,
        writableCols: columns,
        returnCols: columns,
    }),
    selectOneBySlug: selectOne({
        table,
        primaryKey: 'slug',
        returnCols: columns,
    }),
    selectDefault: select({
        table,
        returnCols: columns,
        returnOne: true,
        permanentFilters: {
            is_default: true,
        },
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

export const getDefaultUrgentAction = async () => query(urgentActionCrudQueries.selectDefault());

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
