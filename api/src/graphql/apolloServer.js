import { ApolloServer } from 'apollo-server-express';

import config from '../../../config';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const options = {
    typeDefs,
    resolvers,
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
