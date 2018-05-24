import { sendMailSpy } from 'nodemailer';

import { sendMail } from './mailer';

jest.mock('nodemailer');

describe('Mailer', () => {
    describe('sendMail', () => {
        it('should send email from Amnesty address', async () => {
            await sendMail();

            const sentEmail = sendMailSpy.mock.calls[0][0];
            expect(sentEmail.from).toBe('webmestre@amnesty.fr');
        });

        it('should send email to correct recipient', async () => {
            await sendMail('jonathan@marmelab.com');

            const sentEmail = sendMailSpy.mock.calls[0][0];
            expect(sentEmail.to).toBe('jonathan@marmelab.com');
        });

        it('should send email with correct subject and body', async () => {
            await sendMail('jonathan@marmelab.com', 'Hello world!', 'It works!');

            const sentEmail = sendMailSpy.mock.calls[0][0];
            expect(sentEmail.subject).toBe('Hello world!');
            expect(sentEmail.text).toBe('It works!');
        });

        it('should send attachments if any', async () => {
            await sendMail('jonathan@marmelab.com', 'Hello world!', 'It works!', {
                filename: 'letter.pdf',
            });

            const sentEmail = sendMailSpy.mock.calls[0][0];
            expect(sentEmail.attachments).toEqual([{ filename: 'letter.pdf' }]);
        });
    });
});
