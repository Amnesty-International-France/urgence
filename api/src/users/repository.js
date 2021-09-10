import { crud, selectOne, remove } from 'co-postgres-queries';

import query from '../db/client';

const table = 'user_token';

export const getUserTokenByToken = async token => {
    const sql = `SELECT * from ${table} where token = $token AND expire_date::timestamp >= $today::timestamp;`;
    return query(sql, { token, today: new Date().toISOString() });
};

export const getUserTokenByLogin = async login => {
    const sql = `SELECT * from ${table} where login = $login;`;
    return query(sql, { login });
};

export const createUserToken = async ({ login, token, expireDate }) => {
    const sql = `INSERT INTO ${table} (login, token, expire_date) values ($login, $token, $expireDate);`;
    return query(sql, { login, token, expireDate });
};

export const removeUserOldTokenByLogin = async login => {
    const sql = `DELETE FROM ${table} WHERE login=$login AND expire_date::timestamp < $today::timestamp;`;
    return query(sql, { login, today: new Date().toISOString() });
};
