import { crud, selectOne, remove } from 'co-postgres-queries';

import query from '../db/client';

const table = 'user_token';
const columns = ['id', 'user', 'token', 'expire_date'];

const userTokenCrudQueries = {
    ...crud({
        table,
        writableCols: columns,
        returnCols: columns,
    }),
    selectOneByToken: selectOne({
        table,
        primaryKey: 'token',
        returnCols: columns,
    }),
    selectOneByUser: selectOne({
        table,
        primaryKey: 'user',
        returnCols: columns,
    }),
};

export const getUserTokens = async ({ perPage, page, sortField, sortOrder }) =>
    query(
        userTokenCrudQueries.select({
            limit: perPage,
            offset: page * perPage,
            sort: sortField,
            sortDir: sortOrder,
        }),
    );

export const getUserToken = async id => query(userTokenCrudQueries.selectOne(id));

export const getUserTokenByToken = async token =>
    query(userTokenCrudQueries.selectOneBySlug(token));

export const getUserTokenByUser = async user => query(userTokenCrudQueries.selectOneBySlug(user));

export const createUserToken = async (user, token, expire_date) =>
    query(userTokenCrudQueries.insertOne({ user, token, expire_date }));

export const updateUserToken = async (id, user, token, expire_date = new Date()) =>
    query(
        userTokenCrudQueries.updateOne(id, {
            user,
            token,
            expire_date,
        }),
    );
export const removeUserToken = async id => query(userTokenCrudQueries.removeOne(id));

export const removeUserTokenByToken = async token => query(userTokenCrudQueries.remove({ token }));

export const removeUserTokenByUser = async user => query(userTokenCrudQueries.remove({ user }));
