const express = require('express');

const config = require('../../config');
const errorHandler = require('./errorHandler');

const urgentActionsRouter = require('./urgentActions/router');

const app = express();

app.use(urgentActionsRouter);
app.use(errorHandler);

if (!module.parent) {
    app.listen(config.port);
}

module.exports = app;
