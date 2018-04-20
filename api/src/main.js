import cors from 'cors';
import express from 'express';

import config from '../../config';
import errorHandler from './errorHandler';
import { graphqlRouter } from './graphql/router';

const app = express();

app.use(cors({
    origin: (origin, cb) => !origin || origin === 'http://localhost:5000' || origin === 'http://localhost:4000' ? cb(null, true) : cb(new Error('Not allowed by CORS')),
    allowedHeaders: 'Origin,Content-Type,Accept,Authorization',
    credentials: true,
}));

app.use('/', graphqlRouter);
app.use(errorHandler);

if (!process.env.NODE_ENV !== 'test') {
    app.listen(config.port);
}

export default app;
