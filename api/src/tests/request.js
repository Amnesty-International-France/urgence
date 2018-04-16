const express = require('express');
const supertest = require('supertest');

module.exports = (router) => {
    const app = express();
    app.use(router);

    return supertest(app);
};
