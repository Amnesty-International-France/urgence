export const sessionData = storage => ({
    getMailObject: () => (storage && storage.getItem(`amnesty_mail_object`)) || '',
    setMailObject(value) {
        storage && storage.setItem(`amnesty_mail_object`, value);
        return this;
    },
});

export default sessionData(global.sessionStorage);
