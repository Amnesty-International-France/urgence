import { crud, selectOne, remove } from 'co-postgres-queries';

import query from '../db/client';

const table = 'user_token';
const columns = ['id', 'login', 'token', 'expire_date'];

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
    selectOneByLogin: selectOne({
        table,
        primaryKey: 'login',
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

export const getUserTokenByLogin = async login =>
    query(userTokenCrudQueries.selectOneBySlug(login));

export const createUserToken = async (login, token, expire_date) =>
    query(userTokenCrudQueries.insertOne({ login, token, expire_date }));

export const updateUserToken = async (id, login, token, expire_date = new Date()) =>
    query(
        userTokenCrudQueries.updateOne(id, {
            login,
            token,
            expire_date,
        }),
    );
export const removeUserToken = async id => query(userTokenCrudQueries.removeOne(id));

export const removeUserTokenByToken = async token => query(userTokenCrudQueries.remove({ token }));

export const removeUserTokenByLogin = async login => query(userTokenCrudQueries.remove({ login }));
