const express = require('express');

const config = require('../../config');
const connectDb = require('./db/middleware');
const errorHandler = require('./errorHandler');

const urgentActionsRouter = require('./urgentActions/router');

const app = express();

app.use(connectDb);
app.use(urgentActionsRouter);
app.use(errorHandler);

if (!module.parent) {
    app.listen(config.port);
}

module.exports = app;
