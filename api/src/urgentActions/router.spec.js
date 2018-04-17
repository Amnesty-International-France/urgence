const supertest = require('supertest');

const app = require('../');
const getClient = require('../db/client');
const router = require('./router');
const fixturesLoader = require('../tests/fixtureLoader');

describe('Urgent Actions API Integration Tests', () => {
    it('GET /api/urgentActions', async () => {
        await Promise.all([
            { title: "José Napoleón Tarrillo Astonitas' Murder" },
            { title: 'Mexico: 48 Asylum Applicants Risk to Be Expulsed' },
            { title: "Commutation of William Montgomery's sentence" },
        ].map(fixturesLoader.createUrgentAction));

        const response = await supertest(app).get('/api/urgentActions');
        expect(response.text).toMatchSnapshot();
    });

    afterEach(async () => {
        await fixturesLoader.truncateAll();
    });
});
