export const generateAppUrl = (route, params) => {
    switch (route) {
        case 'urgentAction':
            return `${process.env.REACT_APP_FRONT_BASE_URL}/#/UA/${params.id}`;

        case 'urgentActionLetter':
            return `${process.env.REACT_APP_API_URL}/urgent-actions/${params.id}.pdf?subject=Custom%20subject&signature=John%20Doe`;

        default:
            throw new Error(`Unknown route: ${route}`);
    }
}
