import cors from 'cors';
import express from 'express';

import config from '../../config';
import errorHandler from './errorHandler';
import { graphqlRouter } from './graphql/router';

const app = express();

app.use(cors({
    origin: config.cors.allowedOrigin,
    allowedHeaders: 'Origin,Content-Type,Accept,Authorization',
    credentials: true,
}));

app.use('/', graphqlRouter);
app.use(errorHandler);

if (!process.env.NODE_ENV !== 'test') {
    app.listen(config.port);
}

export default app;
