const express = require('express');

const config = require('../../config');
const headers = require('./headers');

const urgentActionsRouter = require('./urgentActions/router');

const app = express();

app.use(headers);
app.use(urgentActionsRouter);

app.listen(config.port);
