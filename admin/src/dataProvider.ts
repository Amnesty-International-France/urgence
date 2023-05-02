import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import buildApolloClient from 'ra-data-graphql-simple';
import { getToken } from './authentication/authProvider';

export const httpLink = createUploadLink({
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
});

const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
        headers: {
            ...headers,
            authorization: token ? token : '',
        },
    };
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export const getApolloClient = () =>
    buildApolloClient({
        client,
    });
