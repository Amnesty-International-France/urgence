import request from 'supertest';
import pdf from 'html-pdf';
import lolex from 'lolex';

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
            const response = await request(app).get('/urgent-actions/bcd97ef6-fccc-46f5-8266-d10e768b6603.pdf');
            expect(response.status).toBe(404);
        });

        it('should return a 200 response if urgent action exists', async () => {
            const urgentAction = await createUrgentAction();
            const response = await request(app).get(`/urgent-actions/${urgentAction.id}.pdf`);
            expect(response.status).toBe(200);
        });

        describe('Letter Content', () => {
            let clock;
            beforeEach(() => {
                clock = lolex.install({ now: new Date('2018-05-14 12:00:00')});
            });

            it('should display all chosen paragraphs', async () => {
                const pdfSpy = jest.spyOn(pdf, 'create');

                const urgentAction = await createUrgentAction({
                    message_template: JSON.stringify([
                        { value: 'Dear Minister,' },
                        { value: 'I am appalled to hear about the detention of the second Amnesty International Turkey leader within the space of a month.' }
                    ]),
                });

                const response = await request(app).get(`/urgent-actions/${urgentAction.id}.pdf`);
                expect(response.status).toBe(200);

                const renderedLetter = pdfSpy.mock.calls[0][0];
                expect(renderedLetter).toContain('<p>Dear Minister,</p>');
                expect(renderedLetter).toContain('<p>I am appalled to hear about the detention of the second Amnesty International Turkey leader within the space of a month.</p>');
            });

            it('should display given subject', async () => {
                const pdfSpy = jest.spyOn(pdf, 'create');

                const urgentAction = await createUrgentAction();

                const response = await request(app).get(`/urgent-actions/${urgentAction.id}.pdf?subject=Asking%20for%20a%20fair%20trial`);
                expect(response.status).toBe(200);

                const renderedLetter = pdfSpy.mock.calls[0][0];
                expect(renderedLetter).toContain('Asking for a fair trial');
            });

            it('should display passed signature', async () => {
                const pdfSpy = jest.spyOn(pdf, 'create');

                const urgentAction = await createUrgentAction();

                const response = await request(app).get(`/urgent-actions/${urgentAction.id}.pdf?signature=John%20Doe`);
                expect(response.status).toBe(200);

                const renderedLetter = pdfSpy.mock.calls[0][0];
                expect(renderedLetter).toContain('<p class="signature">John Doe</p>');
            });

            it('should display current date', async () => {
                const pdfSpy = jest.spyOn(pdf, 'create');

                const urgentAction = await createUrgentAction();
                const response = await request(app).get(`/urgent-actions/${urgentAction.id}.pdf`);
                expect(response.status).toBe(200);

                const renderedLetter = pdfSpy.mock.calls[0][0];
                expect(renderedLetter).toContain('Le 14 mai 2018');
            });

            afterEach(() => {
                if (clock) {
                    clock.uninstall();
                }
            });
        });
    });

    afterEach(async () => {
        await truncateAll();
    });
});
