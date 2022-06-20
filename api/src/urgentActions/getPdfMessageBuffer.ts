import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import pdf from 'html-pdf';
import get from 'lodash.get';
import nunjucks from 'nunjucks';
import path from 'path';
import { UrgentAction } from './repository';

export const getPdfMessageBuffer = async (
    urgentAction: UrgentAction,
    subject?: string,
    civility?: string,
    firstname?: string,
    lastname?: string,
    emitterAddressMain?: string,
    emitterAddressMore?: string,
    emitterPostalCode?: string,
    emitterCity?: string,
    emitterCountry?: string,
) =>
    new Promise<Buffer>((resolve, reject) => {
        const recipientAddress = get(
            urgentAction,
            'message.recipient.postal_address',
            '',
        ) as string;
        const messageTemplate = get(urgentAction, 'message.message_template', '') as string;
        const date = format(new Date(), 'DD MMMM YYYY', { locale: frLocale });

        const urgentActionLetter = nunjucks.render(path.join(__dirname, './letter.html'), {
            date,
            recipientAddress,
            civility,
            firstname,
            lastname,
            subject,
            messageTemplate,
            emitterAddressMain,
            emitterAddressMore,
            emitterPostalCode,
            emitterCity,
            emitterCountry,
        });

        return pdf
            .create(urgentActionLetter, {
                format: 'A4',
                border: {
                    top: '3cm',
                    left: '2cm',
                    bottom: '2cm',
                    right: '2cm',
                },
            })
            .toBuffer((err, buffer) => {
                if (err) {
                    return reject(err);
                }
                return resolve(buffer);
            });
    });
