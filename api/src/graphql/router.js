import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

import config from '../../../config';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const graphqlRouter = graphqlHTTP({
    schema,
    graphiql: config.env !== 'production',
    logger: console,
});
