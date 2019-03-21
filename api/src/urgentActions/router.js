import { Router } from 'express';
import isUUID from 'validator/lib/isUUID';

import nunjucks from 'nunjucks';
import { getUrgentAction } from './repository';
import { getPdfMessageBuffer } from './getPdfMessageBuffer';
import { sendMail } from '../mailer';
import { getLetterMailBody } from './letterMailBody';

export const urgentActionsRouter = new Router();

/*urgentActionsRouter.get('/*', async (req, res, next) => {
    console.log('enter for all');
    console.log(req);
    res.send('GET enter for all');
    return res.end();
});*/

urgentActionsRouter.post('/:id.pdf', async (req, res, next) => {
    console.log('enter urgentActionsRouter');
    const { id } = req.params;
    if (!isUUID(id)) {
        return res.status(400).send(`Invalid UUID format: ${id}`);
    }

    const { civility, surname, name, subject, email, addressMain, addressMore, postalCode, city, country } = req.query;

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        console.log('error urgentActionsRouter');
        return res.status(404).send('Not Found');
    }

    const pdfBuffer = await getPdfMessageBuffer(urgentAction, subject, civility, surname, name, addressMain, addressMore, postalCode, city, country);
    res.write(pdfBuffer, 'binary');
    console.log('end urgentActionsRouter');
    return res.end();
});

urgentActionsRouter.post('/:id/send', async (req, res, next) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        return res.status(400).send(`Invalid UUID format: ${id}`);
    }
    try {
        const { civility, surname, name, subject, email, addressMain, addressMore, postalCode, city, country } = req.body;
        const urgentAction = await getUrgentAction(id);
        if (!urgentAction) {
            return res.status(404).send('Not Found');
        }

        const pdfBuffer = await getPdfMessageBuffer(urgentAction, subject, civility, surname, name, addressMain, addressMore, postalCode, city, country);

        await sendMail(email, 'On y est presque !', getLetterMailBody({ urgentAction }), {
            filename: 'letter.pdf',
            content: pdfBuffer,
        });
    } catch (err) {
        return next(err);
    }

    return res.end();
});
