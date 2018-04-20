import buildApolloClient from 'ra-data-graphql-simple';

export const graphqlClientOptions = {
    uri: process.env.REACT_APP_API_URL,
};

export const getApolloClient = () => buildApolloClient({
    clientOptions: graphqlClientOptions,
});

export default () => {
    const getGqlResource = resource => {
        switch (resource) {
            case 'Urgent Actions':
                return 'UrgentAction';

            default:
                throw new Error(`Unknown resource ${resource}`);
        }
    };

    return getApolloClient().then(dataProvider => (type, resource, params) =>
        dataProvider(type, getGqlResource(resource), params)
    );
};
