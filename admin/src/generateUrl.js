import { stringify } from 'qs';

export const generateAppUrl = (route, params) => {
    switch (route) {
        case 'urgentAction':
            return `${process.env.REACT_APP_FRONT_BASE_URL}/#/UA/${params.id}`;

        case 'urgentActionLetter':
            return `${process.env.REACT_APP_API_URL}/urgent-actions/${params.id}.pdf?${stringify({
                subject: 'Custom Subject',
                civility: 'M',
                surname: 'John',
                name: 'Doe',
                addressMain: 'Amnesty International',
                addressMore: 'Le Chaumontois',
                postalCode: '75019',
                city: 'Paris',
                country: 'France',
            })}`;

        default:
            throw new Error(`Unknown route: ${route}`);
    }
};
