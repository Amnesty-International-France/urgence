import buildApolloClient from 'ra-data-graphql-simple';

export default () => {
    const getGqlResource = resource => {
        switch (resource) {
            case 'Urgent Actions':
                return 'UrgentAction';

            default:
                throw new Error(`Unknown resource ${resource}`);
        }
    };

    return buildApolloClient({
        clientOptions: {
            uri: process.env.REACT_APP_API_URL,
        },
    }).then(dataProvider => (type, resource, params) =>
        dataProvider(type, getGqlResource(resource), params)
    );
};
