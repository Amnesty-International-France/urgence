import { addDays } from 'date-fns';
import jwt from 'jsonwebtoken';
import { authProvider, getToken, removeToken, saveToken } from './authProvider';
import { login } from './authQueries';

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
        describe('login', () => {
            it('should save token retrieved by login request in local storage', async () => {
                (login as jest.Mock).mockImplementation(() => Promise.resolve({ token: 'foo' }));
                await authProvider.login({ username: 'username', password: 'password' });
                expect(login).toHaveBeenCalledWith('username', 'password');
                expect(global.localStorage.getItem('token')).toBe('foo');
            });
        });

        describe('logout', () => {
            it('should remove token', async () => {
                global.localStorage.setItem('token', 'foo');
                await authProvider.logout({});

                expect(global.localStorage.getItem('token')).toBe(null);
            });
        });

        describe('checkAuth', () => {
            it('should return a rejected promise if there is no saved token', async () => {
                return expect(authProvider.checkAuth({})).rejects.toBe('No token is provided.');
            });

            it('should return a rejected promise if expiration date is past', async () => {
                const user = { expiration: new Date('1970-01-01').toISOString() };
                const token = jwt.sign(user, 'foo');

                global.localStorage.setItem('token', token);
                return expect(authProvider.checkAuth({})).rejects.toBe('Session has expired.');
            });

            it('should return a resolved promise if token is set and expiration date is in the future', async () => {
                const user = { expiration: addDays(new Date(), 1).toISOString() };
                const token = jwt.sign(user, 'foo');
                global.localStorage.setItem('token', token);

                return expect(authProvider.checkAuth({})).resolves.toBe(undefined);
            });
        });

        describe('checkError', () => {
            it('should remove token with 401 response status', async () => {
                global.localStorage.setItem('token', 'foo');
                try {
                    await authProvider.checkError({ status: 401 });
                } catch (error) {}
                expect(global.localStorage.getItem('token')).toBe(null);
            });

            it('should remove token with 403 response status', async () => {
                global.localStorage.setItem('token', 'foo');
                try {
                    await authProvider.checkError({ status: 403 });
                } catch (error) {}
                expect(global.localStorage.getItem('token')).toBe(null);
            });

            it('should return a rejected promise with 401 response status', async () => {
                return expect(authProvider.checkError({ status: 401 })).rejects.toBe(
                    'Session has expired.',
                );
            });

            it('should return a rejected promise with 403 response status', async () => {
                return expect(authProvider.checkError({ status: 401 })).rejects.toBe(
                    'Session has expired.',
                );
            });

            it('should return a resolved promise with 200 response status', async () => {
                return expect(authProvider.checkError({ status: 200 })).resolves.toBe(undefined);
            });
        });

        describe('getPermissions', () => {
            it('should return a rejected promise if there is no saved token', async () => {
                return expect(authProvider.getPermissions({})).rejects.toBe(
                    'No token is provided.',
                );
            });
            it('should return the role of the user', async () => {
                const user = { role: 'admin' };
                const token = jwt.sign(user, 'foo');
                global.localStorage.setItem('token', token);
                const permissions = await authProvider.getPermissions({});
                expect(permissions).toBe('admin');
            });
        });
    });

    afterEach(() => {
        global.localStorage.clear();
    });
});
