import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import config from '../../../config';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const options = {
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';

        if (!token) {
            return {
                user: null,
            };
        }

        const decodedToken = jwt.decode(token);

        // // Try to retrieve a user with the token
        const user = {
            login: 'adrien',
            ...decodedToken,
        }; // getUser(token);

        return { user };
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
