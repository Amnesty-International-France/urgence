import { addDays } from 'date-fns';
import jwt from 'jsonwebtoken';
import { AUTH_ERROR, AUTH_CHECK, AUTH_LOGIN, AUTH_LOGOUT } from 'ra-core';

import { login } from './authQueries';
import { getToken, saveToken, removeToken, authProvider } from './authProvider';

jest.mock('./authQueries');

describe('Authentication Provider', () => {
    describe('getToken', () => {
        it('should retrieve token from local storage', () => {
            global.localStorage.setItem('token', 'foo');
            const token = getToken();
            expect(token).toBe('foo');
        });
    });

    describe('saveToken', () => {
        it('should save given token in local storage', () => {
            saveToken('foo');
            const token = global.localStorage.getItem('token');
            expect(token).toBe('foo');
        });
    });

    describe('removeToken', () => {
        it('should remove token from local storage', () => {
            global.localStorage.setItem('token', 'foo');
            removeToken();
            expect(global.localStorage.getItem('token')).toBe(null);
        });
    });

    describe('Provider', () => {
        describe('AUTH_LOGIN', () => {
            it('should save token retrieved by login request in local storage', async () => {
                login.mockImplementation(() => Promise.resolve({ token: 'foo' }));

                await authProvider(AUTH_LOGIN, { username: 'username', password: 'password' });
                expect(login).toHaveBeenCalledWith('username', 'password');
                expect(global.localStorage.getItem('token')).toBe('foo');
            });
        });

        describe('AUTH_CHECK', () => {
            it('should return a rejected promise if there is no saved token', async () => {
                try {
                    await authProvider(AUTH_CHECK);
                } catch (err) {
                    return;
                }

                expect().toThrowError();
            });

            it('should return a rejected promise if expiration date is past', async () => {
                try {
                    const user = { expiration: new Date('1970-01-01').toISOString() };
                    const token = jwt.sign(user, 'foo');

                    global.localStorage.setItem('token', token);
                    await authProvider(AUTH_CHECK);
                } catch (err) {
                    return;
                }

                expect().toThrowError();
            });

            it('should return a resolved promise if token is set and expiration date is in the future', async () => {
                const user = { expiration: addDays(new Date(), 1).toISOString() };
                const token = jwt.sign(user, 'foo');
                global.localStorage.setItem('token', token);

                await authProvider(AUTH_CHECK);
            });
        });

        describe('AUTH_LOGOUT', () => {
            it('should remove token', async () => {
                global.localStorage.setItem('token', 'foo');
                await authProvider(AUTH_LOGOUT);

                expect(global.localStorage.getItem('token')).toBe(null);
            });
        });

        describe('AUTH_ERROR', () => {
            it('should remove token', async () => {
                const test = async (status, expectedStoredToken) => {
                    global.localStorage.setItem('token', 'foo');

                    try {
                        await authProvider(AUTH_ERROR, { status });
                    } catch (err) {}

                    expect(global.localStorage.getItem('token')).toBe(expectedStoredToken);
                };

                // do not parallelize them as they all work on same localStorage instance
                await test(401, null);
                await test(403, null);
                await test(404, null);
            });

            it('should return a rejected promise ', async () => {
                const test = async (status, expectedException) => {
                    try {
                        await authProvider(AUTH_ERROR, { status });
                    } catch (err) {
                        expect(expectedException).toBe(true);
                        return;
                    }

                    expect(expectedException).toBe(false);
                };

                await Promise.all([test(401, true), test(403, true), test(404, true)]);
            });
        });
    });

    afterEach(() => {
        global.localStorage.clear();
    });
});
