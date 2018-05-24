import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import { apolloUploadExpress } from 'apollo-upload-server';

import { graphqlRouter, graphiqlRouter } from './graphql/router';
import { urgentActionsRouter } from './urgentActions/router';
import config from '../../config';
import errorHandler from './errorHandler';

const app = express();

app.use(
    cors({
        origin: config.cors.allowedOrigin,
        allowedHeaders: 'Origin,Content-Type,Accept,Authorization',
        credentials: true,
    }),
);

if (process.env.NODE_ENV === 'test') {
    app.use('/test', require('./tests/router').default);
}

if (config.env !== 'production') {
    app.get('/graphiql', graphiqlRouter);
}

app.use(bodyParser.json());
app.use('/urgent-actions', urgentActionsRouter);
app.post('/', apolloUploadExpress(), graphqlRouter);
app.use(errorHandler);

export default app;
