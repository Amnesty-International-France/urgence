import { isFuture, parseISO } from 'date-fns';
import jwtDecode from 'jwt-decode';
import { AuthProvider } from 'react-admin';
import { login } from './authQueries';

export const getToken = () => global.localStorage.getItem('token');
export const saveToken = (token: string) => global.localStorage.setItem('token', token);
export const removeToken = () => global.localStorage.removeItem('token');

export type LoginInfo = {
    username: string;
    password: string;
};

export type Token = {
    login: string;
    role: string;
    expiration: string;
    iat: number;
};

export const authProvider: AuthProvider = {
    login: async ({ username, password }: LoginInfo) => {
        try {
            const { token } = await login(username, password);
            saveToken(token);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    },
    logout: () => {
        removeToken();
        return Promise.resolve();
    },
    checkAuth: () => {
        const token = getToken();
        if (!token) {
            return Promise.reject('No token is provided.');
        }

        const { expiration } = jwtDecode<Token>(token);
        if (!isFuture(parseISO(expiration))) {
            return Promise.reject('Session has expired.');
        }

        return Promise.resolve();
    },
    checkError: (error: any) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            removeToken();
            return Promise.reject('Session has expired.');
        }
        return Promise.resolve();
    },
    getPermissions: () => {
        const token = getToken();
        if (!token) {
            return Promise.reject('No token is provided.');
        }

        const { role } = jwtDecode<Token>(token);
        return Promise.resolve(role);
    },
};
