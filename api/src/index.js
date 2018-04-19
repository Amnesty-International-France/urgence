const express = require('express');

const config = require('../../config');
const errorHandler = require('./errorHandler');

const graphqlRouter = require('./graphql/router');

const app = express();

app.use('/', graphqlRouter);
app.use(errorHandler);

if (!module.parent) {
    app.listen(config.port);
}

module.exports = app;
