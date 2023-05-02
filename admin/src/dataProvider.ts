import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
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

// https://stackoverflow.com/questions/52786220/how-to-fix-graphql-mutations-typename-errors
const omitTypename = (key: String, value: String) => {
    return key === '__typename' ? undefined : value
}

const omitTypenameLink = new ApolloLink((operation, forward) => {
    if (operation.variables) {
        operation.variables = JSON.parse(
            JSON.stringify(operation.variables),
            omitTypename
        )
    }
    return forward(operation)
})

export const client = new ApolloClient({
    link:  ApolloLink.from([authLink, omitTypenameLink, httpLink]),
    cache: new InMemoryCache(),
});

export const getApolloClient = () =>
    buildApolloClient({
        client,
    });
