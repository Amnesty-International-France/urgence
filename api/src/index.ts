import app from './server';
import config from '../../config/index.cjs';
import express from "express";

app.use('/api/static/', express.static(config.uploadDir));

app.listen(config.port);
