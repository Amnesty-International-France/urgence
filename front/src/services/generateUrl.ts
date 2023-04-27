export default (name: any, params = {}) => {
    switch (name) {
        case 'home':
            return '/';
        case 'error':
            return '/error';
        case 'ua':
            return `/ua/${(params as any).slug || ':slug'}`;
        case 'story':
            return `/ua/${(params as any).slug}/story/${(params as any).page || 0}`;
        case 'act':
            return `/ua/${(params as any).slug}/act`;
        case 'message-view':
            return `/ua/${(params as any).slug}/message-view`;
        case 'message-send':
            return `/ua/${(params as any).slug}/message-send`;
        case 'message-send-copy':
            return `/ua/${(params as any).slug}/message-send-copy`;
        case 'thanks':
            return `/ua/${(params as any).slug}/thanks`;
        case 'register':
            return `/ua/${(params as any).slug}/register`;
        case 'share':
            return `/ua/${(params as any).slug}/share`;
        case 'address':
            return `/ua/${(params as any).slug}/address`;
        case 'thanks-end':
            return `/ua/${(params as any).slug}/thanks-end`;
        case 'letter': {
            return `${process.env.REACT_APP_API_URL}/urgent-actions/${(params as any).id}/send`;
        }
        default:
            throw new Error(`Unknown route ${name} passed to generateUrl`);
    }
};
