export default (name, params = {}) => {
    switch (name) {
        case 'ua':
            return `/ua/${params.id || ':id'}`;
        case 'story':
            return `/ua/${params.id}/story/${params.page || 0}`;
        case 'act':
            return `/ua/${params.id}/act`;
        case 'message':
            return `/ua/${params.id}/message/${params.page || 0}`;
        case 'thanks':
            return `/ua/${params.id}/thanks`;
        case 'home':
            return '/';
        default:
            throw new Error(`Unknown route ${name} passed to generateUrl`);
    }
};
