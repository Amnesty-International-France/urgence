import cors from 'cors';
import express from 'express';

import config from '../../config/index.cjs';
import errorHandler from './errorHandler';
import router from './router';
import apolloServer from './graphql/apolloServer';

const app = express();

app.use(
    cors({
        origin: config.cors.allowedOrigin,
        allowedHeaders: 'Origin,Content-Type,Accept,Authorization',
        credentials: true,
    }),
);

app.use(config.api.prefixUrl, router);

const startApollo = async () => {
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
    });
};

startApollo();

app.use(errorHandler);

export default app;
