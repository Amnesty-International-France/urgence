import request from 'supertest';
import pdf from 'html-pdf';

import app from '../server';
import { createUrgentAction, truncateAll } from '../tests/fixtureLoader';

describe('Urgent Actions Router', () => {
    describe('/urgent-actions/${id}.pdf', () => {
        it('should return a 404 if no id is passed', async () => {
            const response = await request(app).get('/urgent-actions/.pdf');
            expect(response.status).toBe(404);
        });

        it('should return a 400 if an invalid UUID is passed as id', async () => {
            const response = await request(app).get('/urgent-actions/foo.pdf');
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid UUID format: foo');
        });

        it('should return a 404 if no urgent action matches given UUID', async () => {
            const response = await request(app).get(
                '/urgent-actions/bcd97ef6-fccc-46f5-8266-d10e768b6603.pdf',
            );
            expect(response.status).toBe(404);
        });

        it('should return a 200 response if urgent action exists', async () => {
            const urgentAction = await createUrgentAction();
            const response = await request(app).get(`/urgent-actions/${urgentAction.id}.pdf`);
            expect(response.status).toBe(200);
        });
    });

    afterEach(async () => {
        await truncateAll();
    });
});
