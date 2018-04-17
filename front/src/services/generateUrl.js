export default (name, params = {}) => {
    switch (name) {
        case 'ua':
            return `/ua/${params.id || ':id'}`;
        case 'home':
            return '/';
        default:
            throw new Error(`Unknown route ${name} passed to generateUrl`);
    }
};
