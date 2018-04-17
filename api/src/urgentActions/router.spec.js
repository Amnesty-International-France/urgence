const supertest = require('supertest');


const app = require('../');
const getClient = require('../db/client');
const router = require('./router');
const getFixturesLoader = require('../tests/fixtureLoader');

describe('Urgent Actions API Integration Tests', () => {
    let client;
    let fixturesLoader;
    beforeAll(async () => {
        client = await getClient();
        fixturesLoader = getFixturesLoader(client);
    });

    it('GET /api/urgentActions', async () => {
        await Promise.all([
            fixturesLoader.createUrgentAction({ title: "José Napoleón Tarrillo Astonitas' Murder" }),
            fixturesLoader.createUrgentAction({ title: 'Mexico: 48 Asylum Applicants Risk to Be Expulsed' }),
            fixturesLoader.createUrgentAction({ title: "Commutation of William Montgomery's sentence" }),
        ]);

        const response = await supertest(app).get('/api/urgentActions');
        expect(response.text).toMatchSnapshot();
    });

    afterEach(async () => {
        await fixturesLoader.truncateAll();
    });

    afterAll(async () => {
        await client.release();
    });
});
