import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import config from '../../../config';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

import { loginByToken } from '../users/resolvers';

const options = {
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization || '';

        if (!token) {
            return {
                user: null,
            };
        }

        const isAuthenticated = await loginByToken(null, { token });

        if (!isAuthenticated) {
            return {
                user: null,
            };
        }

        const decodedToken = jwt.decode(token);

        return {
            user: {
                ...decodedToken,
                token,
            },
        };
    },
};

if (config.env !== 'production') {
    options.playground = {
        endpoint: `${process.env.REACT_APP_API_URL}/graphql`,
        settings: {
            'editor.theme': 'dark',
        },
    };
}

const server = new ApolloServer(options);

export default server;
