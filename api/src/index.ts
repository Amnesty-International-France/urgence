import app from './server';
import config from '../../config/index.cjs';
import express from "express";

app.listen(config.port);

app.use(express.static('uploads'));
