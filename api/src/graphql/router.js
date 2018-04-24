import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import config from '../../../config';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';
import omitDeep from '../utils/omitDeep';

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const graphqlRouter = graphqlExpress({
    schema,
    // logFunction: console.log,
    formatParams: ({ variables, ...rest }) => {
        if (!variables) {
            return rest;
        }
        return {
            variables: omitDeep(['__typename'], variables),
            ...rest
        };
    }
});

export const graphiqlRouter = graphiqlExpress({
    endpointURL: '/',
});

