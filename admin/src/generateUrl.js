export const generateAppUrl = (route, params) => {
    switch (route) {
        case 'urgentAction':
            return `${process.env.REACT_APP_FRONT_BASE_URL}/UA/${params.id}`;

        default:
            throw new Error(`Unknown route: ${route}`);
    }
}
