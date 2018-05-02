export const sessionData = storage => ({
    getObject: () => storage.getItem('amnesty_object'),
    setObject(value) {
        storage.setItem('amnesty_object', value);
        return this;
    },
});

export default sessionData(window.sessionStorage);
