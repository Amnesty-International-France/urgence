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

    describe('.getCivility', () => {
        it('calls storage.getItem(amnesty_civility) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'civility value'),
            };

            expect(sessionData(storage).getCivility()).toBe('civility value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_civility');
        });
    });

    describe('.setCivility', () => {
        it('calls storage.setItem(amnesty_civility, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);

            expect(mySessionData.setCivility('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_civility', 'value');
        });
    });

    describe('.getSurname', () => {
        it('calls storage.getItem(amnesty_surname) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'surname value'),
            };

            expect(sessionData(storage).getSurname()).toBe('surname value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_surname');
        });
    });

    describe('.setSurname', () => {
        it('calls storage.setItem(amnesty_surname, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);

            expect(mySessionData.setSurname('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_surname', 'value');
        });
    });

    describe('.getName', () => {
        it('calls storage.getItem(amnesty_name) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'name value'),
            };

            expect(sessionData(storage).getName()).toBe('name value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_name');
        });
    });

    describe('.setName', () => {
        it('calls storage.setItem(amnesty_name, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = sessionData(storage);

            expect(mySessionData.setName('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_name', 'value');
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
