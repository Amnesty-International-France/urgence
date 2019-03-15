import { stringify } from 'qs';

export const generateAppUrl = (route, params) => {
    switch (route) {
        case 'urgentAction':
            return `${process.env.REACT_APP_FRONT_BASE_URL}/#/UA/${params.id}`;

        case 'urgentActionLetter':
            return `${process.env.REACT_APP_API_URL}/urgent-actions/${params.id}.pdf?${stringify({
                subject: 'Custom Subject',
                civility: 'M.',
                surname: 'John',
                name: 'Doe',
                address: `Amnesty International
                    Le Chaumontois
                    72-76, boulevard de la Villette
                    75019 Paris
                    France
                `,
            })}`;

        default:
            throw new Error(`Unknown route: ${route}`);
    }
};
