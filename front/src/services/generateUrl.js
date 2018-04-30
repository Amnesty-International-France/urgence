export default (name, params = {}) => {
    switch (name) {
        case 'ua':
            return `/ua/${params.id || ':id'}`;
        case 'message':
            return `/ua/${params.id}/message/${params.page || 0}`;
        case 'story':
            return `/ua/${params.id}/story/${params.page || 0}`;
        case 'home':
            return '/';
        default:
            throw new Error(`Unknown route ${name} passed to generateUrl`);
    }
};
