import { addHours } from 'date-fns';
import jwt from 'jsonwebtoken';

import config from '../../../config';

import { createUserToken, getUserTokenByToken, removeUserOldTokenByLogin } from './repository';

export const createToken = async (user, now = new Date()) => {
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

    await createUserToken({ login: user.login, token, expireDate: expiration });

    return token;
};

export const login = async (_, { username, password }) => {
    if (
        username !== config.admin.authentication.username ||
        password !== config.admin.authentication.password
    ) {
        throw new Error('Invalid credentials.');
    }

    const token = await createToken({ login: username, role: 'admin' });
    return { token };
};

export const loginByToken = async (_, { token }) => {
    const [userToken] = await getUserTokenByToken(token);

    if (!userToken || !userToken.token) {
        throw new Error('Invalid credentials.');
    }

    return {
        token: userToken.token,
    };
};

export default {
    Query: {
        login,
        loginByToken,
    },
};
