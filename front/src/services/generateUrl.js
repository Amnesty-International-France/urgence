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
        case 'register':
            return `/ua/${params.id}/register`;
        case 'address':
            return `/ua/${params.id}/address`;
        case 'thanks-end':
            return `/ua/${params.id}/thanks-end`;
        case 'home':
            return '/';
        case 'letter': {
            return `${process.env.REACT_APP_API_URL}/urgent-actions/${params.id}/send`;
        }
        case 'save-register': {
            return `${process.env.REACT_APP_API_URL}/urgent-actions/${params.id}/register`;
        }

        default:
            throw new Error(`Unknown route ${name} passed to generateUrl`);
    }
};
