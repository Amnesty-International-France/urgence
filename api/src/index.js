const express = require('express');
const cors = require('cors');

const config = require('../../config');
const errorHandler = require('./errorHandler');

const graphqlRouter = require('./graphql/router');

const app = express();

app.use(
    cors({
        origin: (origin, cb) => !origin || origin === 'http://localhost:5000' || origin === 'http://localhost:4000' ? cb(null, true) : cb(new Error('Not allowed by CORS')),
        allowedHeaders: 'Origin,Content-Type,Accept,Authorization',
        credentials: true,
    }),
);
app.post('/', graphqlRouter);
app.get('/', graphqlRouter);
app.use(errorHandler);

if (!module.parent) {
    app.listen(config.port);
}

module.exports = app;
