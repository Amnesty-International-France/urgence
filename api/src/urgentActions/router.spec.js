const requestFactory = require('../tests/request');

const router = require('./router');

describe('Urgent Actions API Integration Tests', () => {
    it('GET /api/urgentActions', async () => {
        const request = requestFactory(router);

        const response = await request.get('/api/urgentActions');
        expect(response.text).toMatchSnapshot();
    });
});
