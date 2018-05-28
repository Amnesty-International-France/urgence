import cors from 'cors';
import express from 'express';

import config from '../../config';
import errorHandler from './errorHandler';
import { apiRouter } from './router';

const app = express();

app.use(
    cors({
        origin: config.cors.allowedOrigin,
        allowedHeaders: 'Origin,Content-Type,Accept,Authorization',
        credentials: true,
    }),
);

app.use(config.api.prefixUrl, apiRouter);
app.use(errorHandler);

export default app;
