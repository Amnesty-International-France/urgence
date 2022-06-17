import pick from 'lodash.pick';
import omit from 'lodash.omit';
import { createTransport } from 'nodemailer';

import { mailer, mailer as mailerConfig } from '../../config';
import { Options } from 'nodemailer/lib/mailer';

let config: { auth?: typeof mailerConfig.smtp.auth } & (
    | Pick<typeof mailerConfig.smtp, 'service'>
    | Omit<typeof mailerConfig.smtp, 'service' | 'auth'>
) =
    mailerConfig.smtp.service === 'gmail'
        ? pick(mailerConfig.smtp, ['service', 'auth'])
        : omit(mailerConfig.smtp, ['service']);

if (!config.auth?.user) {
    delete config.auth;
}

const transporter = createTransport(config);
transporter.verify((err) => {
    throw err;
});

export const sendMail = async (options: Options) =>
    transporter.sendMail({
        from: mailerConfig.emitter,
        ...options,
    });
