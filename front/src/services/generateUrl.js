import { stringify } from 'qs';

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
        case 'object':
            return `/ua/${params.id}/object`;
        case 'thanks':
            return `/ua/${params.id}/thanks`;
        case 'home':
            return '/';

        case 'letter': {
            const { subject, signature } = params;

            return `${process.env.REACT_APP_API_URL}/urgent-actions/${params.id}.pdf?${stringify({
                subject,
                signature,
            })}`;
        }

        default:
            throw new Error(`Unknown route ${name} passed to generateUrl`);
    }
};
