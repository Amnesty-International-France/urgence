import buildApolloClient from 'ra-data-graphql-simple';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const graphqlClientOptions = {
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
};

const client = new ApolloClient({
    link: createUploadLink(graphqlClientOptions),
    cache: new InMemoryCache({ addTypename: false }),
});

export const getApolloClient = () =>
    buildApolloClient({
        client,
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
        dataProvider(type, getGqlResource(resource), params),
    );
};
