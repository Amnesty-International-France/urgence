import jwtDecode from 'jwt-decode';

import { createToken, login } from "./resolvers";

describe('Users Resolvers', () => {
    let clock;
    beforeEach(() => {
        clock = lolex.install({ now: new Date('2017-01-01') });
    });

    describe('createToken', () => {
        it('should return a signed JWT token containing user data', () => {
            const token = createToken({ role: 'admin' });
            const decodedToken = jwtDecode(token);
            expect(decodedToken.role).toBe('admin');
        });

        it('should correctly set expiration date', () => {
            const token = createToken({ role: 'admin' }, new Date('2017-01-01'));
            const decodedToken = jwtDecode(token);
            expect(decodedToken.expiration).toBe('2017-01-01T06:00:00.000Z');
        });
    });

    describe('login', () => {
        it('should return the signed token passing it the "admin" role in case of success', () => {
            const { token } = login(null, {
                username: 'admin',
                password: 'password',
            });

            const decodedToken = jwtDecode(token);
            expect(decodedToken.role).toBe('admin');
        });

        it("should throw an error if user credentials don't match those in configuration", () => {
            try {
                login(null, {
                    username: 'foo',
                    password: 'bar',
                });
            } catch (err) {
                expect(err.message).toBe('Invalid credentials.');
                return;
            }

            expect(true).toBe(false);
        });
    });

    afterEach(() => {
        clock.uninstall();
    })
});
