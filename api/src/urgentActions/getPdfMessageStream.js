import path from 'path';
import { format } from 'date-fns';
import frLocale from 'date-fns/locale/fr';
import pdf from 'html-pdf';
import nunjucks from 'nunjucks';

export const getPdfMessageStream = async (urgentAction, subject, signature) =>
    new Promise((resolve, reject) => {
        const urgentActionLetter = nunjucks.render(path.join(__dirname, './letter.html'), {
            date: format(new Date(), 'DD MMMM YYYY', { locale: frLocale }),
            recipientAddress: urgentAction.recipient.postal_address,
            signature,
            subject,
            urgentAction,
        });

        return pdf
            .create(urgentActionLetter, {
                format: 'A4',
                border: {
                    top: '3.81cm',
                    left: '2cm',
                    bottom: '2cm',
                    right: '2cm',
                },
            })
            .toStream((err, stream) => {
                if (err) {
                    return reject(err);
                }

                return resolve(stream);
            });
    });
