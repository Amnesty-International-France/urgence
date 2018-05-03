export const sessionData = storage => ({
    getMailObject: () => storage.getItem('amnesty_mail_object'),
    setMailObject(value) {
        storage.setItem('amnesty_mail_object', value);
        return this;
    },
});

export default sessionData(window.sessionStorage);
