import { createTransport } from 'nodemailer';

import { mailer as mailerConfig } from '../../config';

const smtpConfig = { ...mailerConfig.smtp };
if (!mailerConfig.smtp.auth.user) {
    delete smtpConfig.auth;
}

const transporter = createTransport(smtpConfig);
transporter.verify(err => {
    if (err) {
        throw new Error(err);
    }
});

export const sendMail = async (to, subject, { html, text }, attachment) =>
    transporter.sendMail({
        from: mailerConfig.emitter,
        to,
        subject,
        text,
        html,
        attachments: [attachment],
    });
