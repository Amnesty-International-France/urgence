import { ApolloServer, AuthenticationError, Config } from 'apollo-server-express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import config from '../../../config/index.cjs';
import { loginByToken } from '../users/resolvers';
import resolvers from './resolvers';
import typeDefs from './typeDefs';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { rateLimitDirective } from 'graphql-rate-limit-directive';

const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } = rateLimitDirective();

const schema = rateLimitDirectiveTransformer(
    makeExecutableSchema({
        typeDefs: [rateLimitDirectiveTypeDefs, ...typeDefs],
        resolvers,
    }),
);

const options: Config = {
    schema: schema,
    context: async ({ req }: { req: Request }) => {
        const token = req.headers.authorization || '';

        if (!token) {
            return {
                user: null,
            };
        }

        const isAuthenticated = await loginByToken(token);

        if (!isAuthenticated) {
            throw new AuthenticationError('You must be logged in');
        }

        const decodedToken = jwt.decode(token) as JwtPayload;

        return {
            user: {
                ...decodedToken,
                token,
            },
        };
    },
};

if (config.env !== 'production') {
    // @ts-ignore
    options.playground = {
        endpoint: `${process.env.REACT_APP_API_URL}/graphql`,
        settings: {
            'editor.theme': 'dark',
        },
    };
}

const server = new ApolloServer(options);

export default server;
