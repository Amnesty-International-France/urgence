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

    describe('.getFirstname', () => {
        it('calls storage.getItem(amnesty_firstname) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'firstname value'),
            };

            expect(permanentData(storage).getFirstname()).toBe('firstname value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_firstname');
        });
    });

    describe('.setFirstname', () => {
        it('calls storage.setItem(amnesty_firstname, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setFirstname('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_firstname', 'value');
        });
    });

    describe('.getLastname', () => {
        it('calls storage.getItem(amnesty_lastname) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'lastname value'),
            };

            expect(permanentData(storage).getLastname()).toBe('lastname value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_lastname');
        });
    });

    describe('.setLastname', () => {
        it('calls storage.setItem(amnesty_lastname, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setLastname('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_lastname', 'value');
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

    describe('.getPhone', () => {
        it('calls storage.getItem(amnesty_phone) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'phone value'),
            };

            expect(permanentData(storage).getPhone()).toBe('phone value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_phone');
        });
    });

    describe('.setPhone', () => {
        it('calls storage.setItem(amnesty_phone, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setPhone('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_phone', 'value');
        });
    });

    describe('.getEmail', () => {
        it('calls storage.getItem(amnesty_email) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'email value'),
            };

            expect(permanentData(storage).getEmail()).toBe('email value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_email');
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

    describe('.getRegistered', () => {
        it('calls storage.getItem(amnesty_registered) and returns its result', () => {
            const storage = {
                getItem: jest.fn(() => 'registered value'),
            };

            expect(permanentData(storage).getRegistered()).toBe('registered value');
            expect(storage.getItem).toHaveBeenCalledWith('amnesty_registered');
        });
    });

    describe('.setRegistered', () => {
        it('calls storage.setItem(amnesty_registered, value) and returns itself', () => {
            const storage = {
                setItem: jest.fn(),
            };

            const mySessionData = permanentData(storage);

            expect(mySessionData.setRegistered('value')).toEqual(mySessionData);
            expect(storage.setItem).toHaveBeenCalledWith('amnesty_registered', 'value');
        });
    });
});
