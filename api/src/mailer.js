import nodemailer from 'nodemailer';

import { mailer as mailerConfig } from '../../config';

const smtpConfig = { ...mailerConfig.smtp };
if (!mailerConfig.smtp.user) {
    delete smtpConfig.auth;
}

const transporter = nodemailer.createTransport(smtpConfig);

transporter.verify(err => {
    if (err) {
        throw new Error(err);
    }
});

export const sendMail = async (to, subject, text, attachment) => {
    return transporter.sendMail({
        from: mailerConfig.emitter,
        to,
        subject,
        text,
    });
};
