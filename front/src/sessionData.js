export const sessionData = storage => ({
    getMailObject: () => storage && storage.getItem('amnesty_mail_object'),
    setMailObject(value) {
        storage && storage.setItem('amnesty_mail_object', value);
        return this;
    },
    getCivility: () => storage.getItem('amnesty_civility'),
    setCivility(value) {
        storage && storage.setItem('amnesty_civility', value);
        return this;
    },
    getSurname: () => storage.getItem('amnesty_surname'),
    setSurname(value) {
        storage && storage.setItem('amnesty_surname', value);
        return this;
    },
    getName: () => storage.getItem('amnesty_name'),
    setName(value) {
        storage && storage.setItem('amnesty_name', value);
        return this;
    },
    getAddressMain: () => storage.getItem('amnesty_address_main'),
    setAddressMain(value) {
        storage && storage.setItem('amnesty_address_main', value);
        return this;
    },
    getAddressMore: () => storage.getItem('amnesty_address_more'),
    setAddressMore(value) {
        storage && storage.setItem('amnesty_address_more', value);
        return this;
    },
    getPostalCode: () => storage.getItem('amnesty_postal_code'),
    setPostalCode(value) {
        storage && storage.setItem('amnesty_postal_code', value);
        return this;
    },
    getCity: () => storage.getItem('amnesty_city'),
    setCity(value) {
        storage && storage.setItem('amnesty_city', value);
        return this;
    },
    getCountry: () => storage.getItem('amnesty_country'),
    setCountry(value) {
        storage && storage.setItem('amnesty_country', value);
        return this;
    },
    getEmail: () => storage.getItem('amnesty_email'),
    setEmail(value) {
        storage && storage.setItem('amnesty_email', value);
        return this;
    },
});

export default sessionData(global.sessionStorage);
