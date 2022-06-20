import { jest } from '@jest/globals';
import { stringify } from 'qs';
import request from 'supertest';

import { sendMail as sendMailOriginal } from '../mailer';
import app from '../server';
import { createUrgentAction, truncateAll } from '../tests/fixtureLoader';
import { getPdfMessageBuffer as getPdfMessageBufferOriginal } from './getPdfMessageBuffer';
import { UrgentAction } from './repository';

jest.mock('../mailer');
jest.mock('./getPdfMessageBuffer');

const getPdfMessageBuffer = jest.mocked(getPdfMessageBufferOriginal, true);
const sendMail = jest.mocked(sendMailOriginal, true);

describe('Urgent Actions Router', () => {
    describe('GET /urgent-actions/${id}.pdf', () => {
        beforeEach(() => {
            getPdfMessageBuffer.mockImplementation(async () => Buffer.from('PDF'));
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
            const urgentAction = (await createUrgentAction()) as UrgentAction;
            const response = await request(app).get(`/urgent-actions/${urgentAction.id}.pdf`);
            expect(response.status).toBe(200);
        });

        it('should return a PDF with correct subject and fullname', async () => {
            const urgentAction = (await createUrgentAction()) as UrgentAction;

            await request(app).get(
                `/urgent-actions/${urgentAction.id}.pdf?${stringify({
                    addressMain: '72-76, boulevard de la Villette',
                    addressMore: 'Le Chaumontois',
                    postalCode: '75019',
                    city: 'Paris',
                    country: 'France',
                    subject: 'Custom Subject',
                    civility: 'M',
                    firstname: 'Firstname',
                    lastname: 'Lastname',
                })}`,
            );

            expect(getPdfMessageBuffer.mock.calls[0][1]).toBe('Custom Subject');
            expect(getPdfMessageBuffer.mock.calls[0][2]).toBe('M');
            expect(getPdfMessageBuffer.mock.calls[0][3]).toBe('Firstname');
            expect(getPdfMessageBuffer.mock.calls[0][4]).toBe('Lastname');
            expect(getPdfMessageBuffer.mock.calls[0][5]).toBe('72-76, boulevard de la Villette');
            expect(getPdfMessageBuffer.mock.calls[0][6]).toBe('Le Chaumontois');
            expect(getPdfMessageBuffer.mock.calls[0][7]).toBe('75019');
            expect(getPdfMessageBuffer.mock.calls[0][8]).toBe('Paris');
            expect(getPdfMessageBuffer.mock.calls[0][9]).toBe('France');
        });
    });

    describe('POST /urgent-actions/${id}/send', () => {
        it('should return a 404 if no id is passed', async () => {
            const response = await request(app).post('/urgent-actions/send');
            expect(response.status).toBe(404);
        });

        it('should return a 400 if an invalid UUID is passed as id', async () => {
            const response = await request(app).post('/urgent-actions/foo/send');
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid UUID format: foo');
        });

        it('should return a 404 if no urgent action matches given UUID', async () => {
            const response = await request(app).post(
                '/urgent-actions/bcd97ef6-fccc-46f5-8266-d10e768b6603/send',
            );
            expect(response.status).toBe(404);
        });

        it('should return a 200 response if urgent action exists', async () => {
            const urgentAction = (await createUrgentAction()) as UrgentAction;
            const response = await request(app).post(`/urgent-actions/${urgentAction.id}/send`);
            expect(response.status).toBe(200);
        });

        it('should generate PDF with correct subject and fullname', async () => {
            const urgentAction = (await createUrgentAction()) as UrgentAction;

            await request(app).post(`/urgent-actions/${urgentAction.id}/send`).send({
                subject: 'Custom Subject',
                civility: 'Civility',
                firstname: 'Firstname',
                lastname: 'Lastname',
            });

            expect(getPdfMessageBuffer.mock.calls[0][1]).toBe('Custom Subject');
            expect(getPdfMessageBuffer.mock.calls[0][2]).toBe('Civility');
            expect(getPdfMessageBuffer.mock.calls[0][3]).toBe('Firstname');
            expect(getPdfMessageBuffer.mock.calls[0][4]).toBe('Lastname');
        });

        it('should send email to correct recipient with attached PDF', async () => {
            getPdfMessageBuffer.mockImplementation(async () => Buffer.from('PDF Buffer'));

            const urgentAction = (await createUrgentAction()) as UrgentAction;

            await request(app)
                .post(`/urgent-actions/${urgentAction.id}/send`)
                .send({ email: 'thiery@marmelab.com' });

            const [{ to: recipient, subject, html, attachments }] = sendMail.mock.calls[0];
            expect(recipient).toBe('thiery@marmelab.com');
            expect(subject).toBe('On y est presque !');
            expect(html).toMatchSnapshot();
            expect(attachments && attachments[0]).toEqual({
                filename: 'letter.pdf',
                content: 'PDF Buffer',
            });
        });

        it('should handle email sending errors', async () => {
            sendMail.mockImplementation(() => {
                throw new Error('Unable to send email.');
            });

            const urgentAction = (await createUrgentAction()) as UrgentAction;

            const response = await request(app)
                .post(`/urgent-actions/${urgentAction.id}/send`)
                .send({ email: 'thiery@marmelab.com' });

            expect(response.status).toBe(500);
        });
    });

    afterEach(async () => {
        await truncateAll();
    });
});
