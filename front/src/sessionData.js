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
    getAddress: () => storage.getItem('amnesty_address'),
    setAddress(value) {
        storage && storage.setItem('amnesty_address', value);
        return this;
    },
    getEmail: () => storage.getItem('amnesty_email'),
    setEmail(value) {
        storage && storage.setItem('amnesty_email', value);
        return this;
    },
});

export default sessionData(global.sessionStorage);
