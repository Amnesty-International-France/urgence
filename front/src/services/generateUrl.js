export default (name, params = {}) => {
    switch (name) {
        case 'ua':
            return `/ua/${params.id || ':id'}`;
        case 'story':
            return `/ua/${params.id}/story/${params.page || 0}`;
        case 'act':
            return `/ua/${params.id}/act`;
        case 'message':
            return `/ua/${params.id}/message`;
        case 'thanks':
            return `/ua/${params.id}/thanks`;
        case 'address':
            return `/ua/${params.id}/address`;
        case 'thanks-letter':
            return `/ua/${params.id}/thanks-letter`;
        case 'home':
            return '/';

        case 'letter': {
            return `${process.env.REACT_APP_API_URL}/urgent-actions/${params.id}/send`;
        }

        default:
            throw new Error(`Unknown route ${name} passed to generateUrl`);
    }
};
