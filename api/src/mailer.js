import pick from 'lodash.pick';
import omit from 'lodash.omit';
import { createTransport } from 'nodemailer';

import { mailer as mailerConfig } from '../../config';

let config = {};
if (mailerConfig.smtp.service === 'gmail') {
    config = pick(mailerConfig.smtp, ['service', 'auth']);
} else {
    config = omit(mailerConfig.smtp, ['service']);
}

if (!config.auth.user) {
    delete config.auth;
}

const transporter = createTransport(config);
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
