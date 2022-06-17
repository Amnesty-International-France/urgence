import client from '../db/client';

const table = 'user_token';

export type User = {
    id: number;
    login: string;
    password: string;
    token: string;
    expire_date: string;
};

export const getUserTokenByToken = async (token: string) => {
    const sql = `SELECT * from ${table} where token = $token AND expire_date::timestamp >= $today::timestamp;`;
    return client
        .select('*')
        .from<User>(table)
        .where({ token })
        .andWhere('expire_date', '>=', new Date().toISOString());
};

export const getUserTokenByLogin = async (login: string) => {
    return client.select('*').from<User>(table).where({ login });
};

export const createUserToken = async ({
    login,
    token,
    expire_date,
}: {
    login: string;
    token: string;
    expire_date: string;
}) => {
    return client<User>(table).insert({ login, token, expire_date }).returning('*');
};

export const removeUserOldTokenByLogin = async (login: string) => {
    return client(table)
        .where({ login })
        .andWhere('expire_date::timestamp', '<', `${new Date().toISOString()}::timestamp`)
        .del();
};
