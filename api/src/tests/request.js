const supertest = require('supertest');
const server = require('../server');

module.exports = supertest(server);
