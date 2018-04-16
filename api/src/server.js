const express = require('express');

const connectDb = require('./db/middleware');
const errorHandler = require('./errorHandler');
const headers = require('./headers');
const memoryReleaser = require('./memoryReleaser');

const urgentActionsRouter = require('./urgentActions/router');

const app = express();

app.use(headers);
app.use(connectDb);

app.use(urgentActionsRouter);
app.use(memoryReleaser);
app.use(errorHandler);

module.exports = app;
