export const sessionData = (storage: any) => ({
    getMailObject: () => (storage && storage.getItem(`amnesty_mail_object`)) || '',

    setMailObject(value: any) {
        storage && storage.setItem(`amnesty_mail_object`, value);
        return this;
    },
});

export default sessionData(global.sessionStorage);
