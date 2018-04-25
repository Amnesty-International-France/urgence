import { makeExecutableSchema } from 'graphql-tools';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { assoc, prop } from 'ramda';

import config from '../../../config';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';
import omitDeep from '../utils/omitDeep';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const omitTypeName = omitDeep(['__typename']);

export const graphqlRouter = graphqlExpress({
    schema,
    formatParams: ({ variables, ...rest }) => {
        if (!variables) {
            return rest;
        }

        return {
            variables: omitTypeName(variables),
            ...rest
        };
    }
});

export const graphiqlRouter = graphiqlExpress({
    endpointURL: '/',
});

