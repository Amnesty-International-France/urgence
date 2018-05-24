import { sessionData } from './sessionData';

describe('sessionData', () => {
    describe('.getMailObject', () => {
        it('calls storage.getItem(amnesty_opbject) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'object value'),
            };

            expect(sessionData(storage).getMailObject()).toBe('object value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_mail_object');
        });
    });

    describe('.setMailObject', () => {
        it('calls storage.setItem(amnesty_object, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);

            expect(mySessionData.setMailObject('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_mail_object', 'value');
        });
    });

    describe('.getSignature', () => {
        it('calls storage.getItem(amnesty_signature) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'signature value'),
            };

            expect(sessionData(storage).getSignature()).toBe('signature value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_signature');
        });
    });

    describe('.setSignature', () => {
        it('calls storage.setItem(amnesty_signature, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);

            expect(mySessionData.setSignature('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_signature', 'value');
        });
    });

    describe('.getAddress', () => {
        it('calls storage.getItem(amnesty_address) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'Address value'),
            };

            expect(sessionData(storage).getAddress()).toBe('Address value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_address');
        });
    });

    describe('.setAddress', () => {
        it('calls storage.setItem(amnesty_address, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);

            expect(mySessionData.setAddress('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_address', 'value');
        });
    });

    describe('.setEmail', () => {
        it('calls storage.setItem(amnesty_email, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);

            expect(mySessionData.setEmail('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_email', 'value');
        });
    });
});
