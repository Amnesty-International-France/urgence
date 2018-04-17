export default (name, id) => {
    switch (name) {
        case 'ua':
            return `/ua/${id || ':id'}`;
        case 'home':
        default:
            return '/';
    }
};
