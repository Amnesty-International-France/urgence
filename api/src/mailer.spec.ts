// @ts-ignore
import { sendMailSpy } from 'nodemailer';

import { sendMail } from './mailer';

jest.mock('nodemailer');

describe('Mailer', () => {
    afterEach(() => {
        sendMailSpy.mockClear();
    });
    describe('sendMail', () => {
        it('should send email from Amnesty address', async () => {
            await sendMail({});

            const sentEmail = sendMailSpy.mock.calls[0][0];
            expect(sentEmail.from).toBe('webmestre@amnesty.fr');
        });

        it('should send email to correct recipient', async () => {
            await sendMail({ to: 'jonathan@marmelab.com' });

            const sentEmail = sendMailSpy.mock.calls[0][0];
            expect(sentEmail.to).toBe('jonathan@marmelab.com');
        });

        it('should send email with correct subject and body (in both HTML and text)', async () => {
            await sendMail({
                to: 'jonathan@marmelab.com',
                subject: 'Hello world!',
                text: 'It works!',
                html: '<p>It works!</p>',
            });

            const sentEmail = sendMailSpy.mock.calls[0][0];
            expect(sentEmail.subject).toBe('Hello world!');
            expect(sentEmail.text).toBe('It works!');
            expect(sentEmail.html).toBe('<p>It works!</p>');
        });

        it('should send attachments if any', async () => {
            await sendMail({
                to: 'jonathan@marmelab.com',
                subject: 'Hello world!',
                attachments: [
                    {
                        filename: 'letter.pdf',
                    },
                ],
            });

            const sentEmail = sendMailSpy.mock.calls[0][0];
            expect(sentEmail.attachments).toEqual([{ filename: 'letter.pdf' }]);
        });
    });
});
