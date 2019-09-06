import { sessionData } from './sessionData';

describe('sessionData', () => {
    describe('.getMailObject', () => {
        it('calls storage.getItem(amnesty_mail_object) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'object value'),
            };

            expect(sessionData(storage).getMailObject()).toBe('object value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_mail_object');
        });
    });

    describe('.setMailObject', () => {
        it('calls storage.setItem(amnesty_mail_object, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);

            expect(mySessionData.setMailObject('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_mail_object', 'value');
        });
    });

    describe('.getGdprMessage', () => {
        it('calls storage.getItem(amnesty_gdpr_message) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'darwin'),
            };

            expect(sessionData(storage).getGdprMessage()).toBe('darwin');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_gdpr_message');
        });
    });

    describe('.setGdprMessage', () => {
        it('calls storage.setItem(amnesty_gdpr_message, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);
            expect(mySessionData.setGdprMessage('darwin')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_gdpr_message', 'darwin');
        });
    });

    describe('.getGdprRegister', () => {
        it('calls storage.getItem(amnesty_gdpr_register) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'darwin'),
            };

            expect(sessionData(storage).getGdprRegister()).toBe('darwin');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_gdpr_register');
        });
    });

    describe('.setGdprRegister', () => {
        it('calls storage.setItem(amnesty_object, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);
            expect(mySessionData.setGdprRegister('darwin')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_gdpr_register', 'darwin');
        });
    });
});
