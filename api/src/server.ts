import cors from 'cors';
import express from 'express';

import config from '../../config/index.cjs';
import errorHandler from './errorHandler';
import router from './router';
import apolloServer from './graphql/apolloServer';
// Breaking changes from graphql-upload with imports. Typescript doesn't like it.
// https://github.com/jaydenseric/graphql-upload/issues/305
// @ts-ignore
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

const app = express();

app.use(
    cors({
        origin: config.cors.allowedOrigin,
        allowedHeaders: 'Origin,Content-Type,Accept,Authorization',
        credentials: true,
    }),
);

app.use(config.api.prefixUrl, router);

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

const startApollo = async () => {
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
    });
};

startApollo();

app.use(errorHandler);

export default app;
