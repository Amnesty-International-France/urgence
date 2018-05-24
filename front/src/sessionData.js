export const sessionData = storage => ({
    getMailObject: () => storage && storage.getItem('amnesty_mail_object'),
    setMailObject(value) {
        storage && storage.setItem('amnesty_mail_object', value);
        return this;
    },
    getSignature: () => storage.getItem('amnesty_signature'),
    setSignature(value) {
        storage && storage.setItem('amnesty_signature', value);
        return this;
    },
    getAddress: () => storage.getItem('amnesty_address'),
    setAddress(value) {
        storage && storage.setItem('amnesty_address', value);
        return this;
    },
});

export default sessionData(global.sessionStorage);
