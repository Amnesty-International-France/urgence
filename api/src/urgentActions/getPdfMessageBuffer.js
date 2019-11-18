import path from 'path';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import pdf from 'html-pdf';
import nunjucks from 'nunjucks';
import get from 'lodash.get';

export const getPdfMessageBuffer = async (
    urgentAction,
    subject,
    civility,
    firstname,
    lastname,
    emitterAddressMain,
    emitterAddressMore,
    emitterPostalCode,
    emitterCity,
    emitterCountry,
) =>
    new Promise((resolve, reject) => {
        const recipientAddress = get(urgentAction, 'message.recipient.postal_address', '');
        const messageTemplate = get(urgentAction, 'message.message_template', '');
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
