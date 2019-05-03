export default (name, params = {}) => {
    switch (name) {
        case 'home':
            return '/';
        case 'error':
            return '/error';
        case 'ua':
            return `/ua/${params.slug || ':slug'}`;
        case 'story':
            return `/ua/${params.slug}/story/${params.page || 0}`;
        case 'act':
            return `/ua/${params.slug}/act`;
        case 'message':
            return `/ua/${params.slug}/message`;
        case 'thanks':
            return `/ua/${params.slug}/thanks`;
        case 'register':
            return `/ua/${params.slug}/register`;
        case 'address':
            return `/ua/${params.slug}/address`;
        case 'thanks-end':
            return `/ua/${params.slug}/thanks-end`;
        case 'letter': {
            return `${process.env.REACT_APP_API_URL}/urgent-actions/${params.id}/send`;
        }
        default:
            throw new Error(`Unknown route ${name} passed to generateUrl`);
    }
};
