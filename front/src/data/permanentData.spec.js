import { permanentData } from './permanentData';

describe('permanentData', () => {
    describe('.getCivility', () => {
        it('calls storage.getItem(amnesty_civility) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'civility value'),
            };

            expect(permanentData(storage).getCivility()).toBe('civility value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_civility');
        });
    });

    describe('.setCivility', () => {
        it('calls storage.setItem(amnesty_civility, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setCivility('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_civility', 'value');
        });
    });

    describe('.getSurname', () => {
        it('calls storage.getItem(amnesty_surname) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'surname value'),
            };

            expect(permanentData(storage).getSurname()).toBe('surname value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_surname');
        });
    });

    describe('.setSurname', () => {
        it('calls storage.setItem(amnesty_surname, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setSurname('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_surname', 'value');
        });
    });

    describe('.getName', () => {
        it('calls storage.getItem(amnesty_name) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'name value'),
            };

            expect(permanentData(storage).getName()).toBe('name value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_name');
        });
    });

    describe('.setName', () => {
        it('calls storage.setItem(amnesty_name, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setName('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_name', 'value');
        });
    });

    describe('.getAddressMain', () => {
        it('calls storage.getItem(amnesty_address_main) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'AddressMain value'),
            };

            expect(permanentData(storage).getAddressMain()).toBe('AddressMain value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_address_main');
        });
    });

    describe('.setAddressMain', () => {
        it('calls storage.setItem(amnesty_address_main, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setAddressMain('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_address_main', 'value');
        });
    });

    describe('.getAddressMore', () => {
        it('calls storage.getItem(amnesty_address_more) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'AddressMore value'),
            };

            expect(permanentData(storage).getAddressMore()).toBe('AddressMore value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_address_more');
        });
    });

    describe('.setAddressMore', () => {
        it('calls storage.setItem(amnesty_address_more, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setAddressMore('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_address_more', 'value');
        });
    });

    describe('.getPostalCode', () => {
        it('calls storage.getItem(amnesty_postal_code) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'Postal Code value'),
            };

            expect(permanentData(storage).getPostalCode()).toBe('Postal Code value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_postal_code');
        });
    });

    describe('.setPostalCode', () => {
        it('calls storage.setItem(amnesty_postal_code, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setPostalCode('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_postal_code', 'value');
        });
    });

    describe('.getCity', () => {
        it('calls storage.getItem(amnesty_city) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'City value'),
            };

            expect(permanentData(storage).getCity()).toBe('City value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_city');
        });
    });

    describe('.setCity', () => {
        it('calls storage.setItem(amnesty_city, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setCity('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_city', 'value');
        });
    });

    describe('.getCountry', () => {
        it('calls storage.getItem(amnesty_country) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'Country value'),
            };

            expect(permanentData(storage).getCountry()).toBe('Country value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_country');
        });
    });

    describe('.setCountry', () => {
        it('calls storage.setItem(amnesty_country, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setCountry('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_country', 'value');
        });
    });

    describe('.setEmail', () => {
        it('calls storage.setItem(amnesty_email, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setEmail('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_email', 'value');
        });
    });
});
