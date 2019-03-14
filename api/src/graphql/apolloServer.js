import { ApolloServer } from 'apollo-server-express';

import config from '../../../config';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolvers';
import omitDeep from '../utils/omitDeep';

const omitTypeName = omitDeep(['__typename']);

const options = {
    typeDefs,
    resolvers,
    formatParams: ({ variables, ...rest }) => {
        if (!variables) {
            return rest;
        }

        return {
            variables: omitTypeName(variables),
            ...rest
        };
    },
};

if (config.env !== 'production') {
    options.playground = {
        endpoint: `${process.env.REACT_APP_API_URL}/graphql`,
        settings: {
            'editor.theme': 'dark'
        }
    };
}

const server = new ApolloServer(options);

export default server;
