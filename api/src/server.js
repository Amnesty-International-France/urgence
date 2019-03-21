import cors from 'cors';
import express from 'express';

import config from '../../config';
import errorHandler from './errorHandler';
import { apiRouter } from './router';
import apolloServer from './graphql/apolloServer';

const app = express();

app.use(
    cors({
        origin: config.cors.allowedOrigin,
        allowedHeaders: 'Origin,Content-Type,Accept,Authorization',
        credentials: true,
    }),
);

/*apolloServer.applyMiddleware({
    app
});*/

console.log('config.api.prefixUrl');
console.log(config.api.prefixUrl);

app.use(config.api.prefixUrl, apiRouter);

app.use(errorHandler);

export default app;
