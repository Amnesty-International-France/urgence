import cors from 'cors';
import express from 'express';

import config from '../../config';
import errorHandler from './errorHandler';
import router from './router';
import routerMetadata from './routerMetadata';
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
app.use(config.api.metadata, routerMetadata);

apolloServer.applyMiddleware({
    app,
});

app.use(errorHandler);

export default app;
