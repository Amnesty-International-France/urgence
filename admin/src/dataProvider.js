import buildApolloClient from 'ra-data-graphql-simple';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

import jwtDecode from 'jwt-decode';
import { isFuture } from 'date-fns';

export const graphqlClientOptions = {
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
};

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    if (token) {
        const { expiration } = jwtDecode(token);
        if (!isFuture(expiration)) {
            global.localStorage.removeItem('token');
            window.location.reload();
            return;
        }
    }

    return {
        headers: {
            ...headers,
            authorization: token || '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(createUploadLink(graphqlClientOptions)),
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
            case 'Settings':
                return 'Setting';
            default:
                throw new Error(`Unknown resource ${resource}`);
        }
    };

    return getApolloClient().then(dataProvider => (type, resource, params) =>
        dataProvider(type, getGqlResource(resource), params),
    );
};
