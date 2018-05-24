import request from 'supertest';
import pdf from 'html-pdf';

import { sendMail } from '../mailer';
import app from '../server';
import { createUrgentAction, truncateAll } from '../tests/fixtureLoader';
import { getPdfMessageBuffer } from './getPdfMessageBuffer';
import sessionData from '../../../front/src/sessionData';

jest.mock('../mailer');
jest.mock('./getPdfMessageBuffer');
jest.mock('../../../front/src/sessionData');

describe('Urgent Actions Router', () => {
    describe('POST /urgent-actions/${id}/send', () => {
        it('should return a 404 if no id is passed', async () => {
            const response = await request(app).post('/urgent-actions//send');
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
            const urgentAction = await createUrgentAction();
            const response = await request(app).post(`/urgent-actions/${urgentAction.id}/send`);
            expect(response.status).toBe(200);
        });

        it('should generate PDF with correct subject and signature', async () => {
            const urgentAction = await createUrgentAction();

            await request(app)
                .post(`/urgent-actions/${urgentAction.id}/send`)
                .send({
                    subject: 'Custom Subject',
                    signature: 'Signature',
                });

            expect(getPdfMessageBuffer.mock.calls[0][1]).toBe('Custom Subject');
            expect(getPdfMessageBuffer.mock.calls[0][2]).toBe('Signature');
        });

        it('should send email to correct recipient with attached PDF', async () => {
            getPdfMessageBuffer.mockImplementation(() => 'PDF Buffer');

            const urgentAction = await createUrgentAction();

            await request(app).post(`/urgent-actions/${urgentAction.id}/send`);

            const [recipient, subject, body, attachment] = sendMail.mock.calls[0];
            expect(recipient).toBe('jonathan@marmelab.com');
            expect(subject).toBe('On y est presque !');
            expect(body).toMatchSnapshot();
            expect(attachment).toEqual({
                filename: 'letter.pdf',
                content: 'PDF Buffer',
            });
        });
    });

    afterEach(async () => {
        await truncateAll();
    });
});
