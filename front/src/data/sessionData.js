export const sessionData = storage => ({
    getMailObject: () => (storage && storage.getItem(`amnesty_mail_object`)) || '',
    setMailObject(value) {
        storage && storage.setItem(`amnesty_mail_object`, value);
        return this;
    },
    getGdprMessage: () => (storage && JSON.parse(storage.getItem('amnesty_gdpr_message'))) || '',
    setGdprMessage(value) {
        storage && storage.setItem('amnesty_gdpr_message', JSON.stringify(value));
        return this;
    },
    getGdprRegister: () => (storage && JSON.parse(storage.getItem('amnesty_gdpr_register'))) || '',
    setGdprRegister(value) {
        storage && storage.setItem('amnesty_gdpr_register', JSON.stringify(value));
        return this;
    },
});

export default sessionData(global.sessionStorage);
