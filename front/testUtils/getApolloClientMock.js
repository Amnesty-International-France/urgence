import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

const typeDefs = `
type UrgentAction {
    id: ID
    title: String
}

type Query {
    UrgentAction: UrgentAction
}
`;

const defaultMocks = {
    UrgentAction: () => null,
};

export default (mocks = defaultMocks) => {
    const schema = makeExecutableSchema({ typeDefs });
    addMockFunctionsToSchema({ schema, mocks });
    const apolloCache = new InMemoryCache(window.__APOLLO_STATE__);

    return new ApolloClient({
        cache: apolloCache,
        link: new SchemaLink({ schema }),
    });
};
