import { ApolloClient, InMemoryCache, SchemaLink } from '@apollo/client';
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../../api/src/graphql/typeDefs';

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
