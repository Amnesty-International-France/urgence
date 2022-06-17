import { ApolloClient, InMemoryCache } from '@apollo/client';

export const graphqlClientOptions = {
    uri: `${process.env.REACT_APP_API_URL}/graphql`,
    cache: new InMemoryCache(),
};

export const client = new ApolloClient(graphqlClientOptions);
