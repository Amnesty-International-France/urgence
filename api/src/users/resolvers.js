import { addHours } from 'date-fns';
import jwt from 'jsonwebtoken';

import config from '../../../config';

import { createUserToken } from './repository';

export const createToken = (user, now = new Date()) => {
    const expiration = addHours(now, config.admin.authentication.sessionDuration).toISOString();

    const token = jwt.sign(
        {
            ...user,
            expiration,
        },
        config.admin.authentication.jwtSecret,
    );
    createUserToken({ login: user.login, token, expire_date: expiration });
    return token;
};

export const login = (_, { username, password }) => {
    if (
        username !== config.admin.authentication.username ||
        password !== config.admin.authentication.password
    ) {
        throw new Error('Invalid credentials.');
    }

    return { token: createToken({ login: username, role: 'admin' }) };
};

export default {
    Query: {
        login,
    },
};
