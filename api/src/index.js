import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

import config from '../../config';
import errorHandler from './errorHandler';
import { graphqlRouter, graphiqlRouter } from './graphql/router';

const app = express();

app.use(cors({
    origin: config.cors.allowedOrigin,
    allowedHeaders: 'Origin,Content-Type,Accept,Authorization',
    credentials: true,
}));
if (config.env !== 'production') {
    app.get('/graphiql', graphiqlRouter);
}
app.use('/', bodyParser.json(), graphqlRouter);

app.use(errorHandler);

if (!process.env.NODE_ENV !== 'test') {
    app.listen(config.port);
}

export default app;
