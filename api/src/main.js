import cors from 'cors';
import express from 'express';

import config from '../../config';
import errorHandler from './errorHandler';
import { graphqlRouter } from './graphql/router';
import testRouter from './tests/router';

const app = express();

app.use(cors({
    origin: config.cors.allowedOrigin,
    allowedHeaders: 'Origin,Content-Type,Accept,Authorization',
    credentials: true,
}));

if (process.NODE_ENV === 'test') {
    app.use('/test', testRouter);
}

app.use('/', graphqlRouter);
app.use(errorHandler);

if (!process.env.NODE_ENV !== 'test') {
    app.listen(config.port);
}

export default app;
