import { addHours } from 'date-fns';
import jwt from 'jsonwebtoken';

import config from '../../../config/index.cjs';

import { createUserToken, getUserTokenByToken, removeUserOldTokenByLogin } from './repository';

export type AuthenticatedUser = { login: string; role: string };

export const createToken = async (user: AuthenticatedUser, now = new Date()) => {
    const expiration = addHours(now, config.admin.authentication.sessionDuration).toISOString();

    const token = jwt.sign(
        {
            ...user,
            expiration,
        },
        config.admin.authentication.jwtSecret,
    );

    try {
        await removeUserOldTokenByLogin(user.login);
    } catch (error) {
        console.error('cleaning tokens failed');
        console.error(error);
    }

    await createUserToken({ login: user.login, token, expire_date: expiration });

    return token;
};

export const login = async (
    _: unknown,
    { username, password }: { username: string; password: string },
) => {
    if (
        username !== config.admin.authentication.username ||
        password !== config.admin.authentication.password
    ) {
        throw new Error('Invalid credentials.');
    }

    const token = await createToken({ login: username, role: 'admin' });
    return { token };
};

export const loginByToken = async (token: string) => {
    const [userToken] = await getUserTokenByToken(token);

    if (!userToken || !userToken.token) {
        return false;
    }

    return true;
};

export default {
    Query: {
        login,
        loginByToken,
    },
};
