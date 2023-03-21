export const permanentData = (storage: any) => ({
    getCivility: () => (storage && storage.getItem('amnesty_civility')) || '',

    setCivility(value: any) {
        storage && storage.setItem('amnesty_civility', value);
        return this;
    },

    getFirstname: () => (storage && storage.getItem('amnesty_firstname')) || '',

    setFirstname(value: any) {
        storage && storage.setItem('amnesty_firstname', value);
        return this;
    },

    getLastname: () => (storage && storage.getItem('amnesty_lastname')) || '',

    setLastname(value: any) {
        storage && storage.setItem('amnesty_lastname', value);
        return this;
    },

    getAddressMain: () => (storage && storage.getItem('amnesty_address_main')) || '',

    setAddressMain(value: any) {
        storage && storage.setItem('amnesty_address_main', value);
        return this;
    },

    getAddressMore: () => (storage && storage.getItem('amnesty_address_more')) || '',

    setAddressMore(value: any) {
        storage && storage.setItem('amnesty_address_more', value);
        return this;
    },

    getPostalCode: () => (storage && storage.getItem('amnesty_postal_code')) || '',

    setPostalCode(value: any) {
        storage && storage.setItem('amnesty_postal_code', value);
        return this;
    },

    getCity: () => (storage && storage.getItem('amnesty_city')) || '',

    setCity(value: any) {
        storage && storage.setItem('amnesty_city', value);
        return this;
    },

    getCountry: () => (storage && storage.getItem('amnesty_country')) || '',

    setCountry(value: any) {
        storage && storage.setItem('amnesty_country', value);
        return this;
    },

    getPhone: () => (storage && storage.getItem('amnesty_phone')) || '',

    setPhone(value: any) {
        storage && storage.setItem('amnesty_phone', value);
        return this;
    },

    getEmail: () => (storage && storage.getItem('amnesty_email')) || '',

    setEmail(value: any) {
        storage && storage.setItem('amnesty_email', value);
        return this;
    },

    getRegistered: () => (storage && storage.getItem('amnesty_registered')) || '',

    setRegistered(value: any) {
        storage && storage.setItem('amnesty_registered', value);
        return this;
    },
});

export default permanentData(global.localStorage);
