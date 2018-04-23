import { addHours } from 'date-fns';
import jwt from 'jsonwebtoken';

import config from '../../../config';

export const createToken = (user, now = new Date()) => {
    const expiration = addHours(now, config.admin.authentication.sessionDuration).toISOString();

    return jwt.sign({
        ...user,
        expiration,
    }, config.admin.authentication.jwtSecret);
};

export const login = (_, { username, password }) => {
    if (username !== config.admin.authentication.username || password !== config.admin.authentication.password) {
        throw new Error('Invalid credentials.');
    }

    return { token: createToken({ role: 'admin' }) };
};

export const UsersResolvers = {
    Query: {
        login,
    },
};
