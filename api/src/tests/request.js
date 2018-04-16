const supertest = require('supertest');
const server = require('../server');

module.exports = (router) => {
    return supertest(server);
};
