import { isFuture } from 'date-fns';
import jwtDecode from 'jwt-decode';

import { AUTH_CHECK, AUTH_ERROR, AUTH_LOGIN, AUTH_LOGOUT } from 'ra-core';

import { login } from './authQueries';

export const getToken = () => global.localStorage.getItem('token');
export const saveToken = token => global.localStorage.setItem('token', token);
export const removeToken = () => global.localStorage.removeItem('token');

export const authProvider = (type, params) => {
    switch (type) {
        case AUTH_LOGIN:
            const { username, password } = params;
            return login(username, password).then(({ token }) => saveToken(token));

        case AUTH_CHECK:
            const token = getToken();
            if (!token) {
                return Promise.reject('No token is provided.');
            }

            const { expiration } = jwtDecode(token);
            if (!isFuture(expiration)) {
                return Promise.reject('Session has expired.');
            }

            return Promise.resolve();

        case AUTH_LOGOUT:
            removeToken();
            return Promise.resolve();

        case AUTH_ERROR:
            const status = params.status;
            if (status === 401 || status === 403) {
                removeToken();
                return Promise.reject('Session has expired.');
            }
            return Promise.resolve();
        default:
            return Promise.resolve();
    }
};

export default authProvider;
