export const permanentData = (storage) => ({
    getCivility: () => (storage && storage.getItem('amnesty_civility')) || '',
    setCivility(value) {
        storage && storage.setItem('amnesty_civility', value);
        return this;
    },
    getFirstname: () => (storage && storage.getItem('amnesty_firstname')) || '',
    setFirstname(value) {
        storage && storage.setItem('amnesty_firstname', value);
        return this;
    },
    getLastname: () => (storage && storage.getItem('amnesty_lastname')) || '',
    setLastname(value) {
        storage && storage.setItem('amnesty_lastname', value);
        return this;
    },
    getAddressMain: () => (storage && storage.getItem('amnesty_address_main')) || '',
    setAddressMain(value) {
        storage && storage.setItem('amnesty_address_main', value);
        return this;
    },
    getAddressMore: () => (storage && storage.getItem('amnesty_address_more')) || '',
    setAddressMore(value) {
        storage && storage.setItem('amnesty_address_more', value);
        return this;
    },
    getPostalCode: () => (storage && storage.getItem('amnesty_postal_code')) || '',
    setPostalCode(value) {
        storage && storage.setItem('amnesty_postal_code', value);
        return this;
    },
    getCity: () => (storage && storage.getItem('amnesty_city')) || '',
    setCity(value) {
        storage && storage.setItem('amnesty_city', value);
        return this;
    },
    getCountry: () => (storage && storage.getItem('amnesty_country')) || '',
    setCountry(value) {
        storage && storage.setItem('amnesty_country', value);
        return this;
    },
    getPhone: () => (storage && storage.getItem('amnesty_phone')) || '',
    setPhone(value) {
        storage && storage.setItem('amnesty_phone', value);
        return this;
    },
    getEmail: () => (storage && storage.getItem('amnesty_email')) || '',
    setEmail(value) {
        storage && storage.setItem('amnesty_email', value);
        return this;
    },
    getRegistered: () => (storage && storage.getItem('amnesty_registered')) || '',
    setRegistered(value) {
        storage && storage.setItem('amnesty_registered', value);
        return this;
    },
});

export default permanentData(global.localStorage);
