import { Router } from 'express';
import isUUID from 'validator/lib/isUUID';

import nunjucks from 'nunjucks';
import { getUrgentAction } from './repository';
import { getPdfMessageBuffer } from './getPdfMessageBuffer';
import { sendMail } from '../mailer';
import { getLetterMailBody } from './letterMailBody';

export const urgentActionsRouter = new Router();

urgentActionsRouter.get('/:id.pdf', async (req, res, next) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        return res.status(400).send(`Invalid UUID format: ${id}`);
    }

    const { signature, subject, email, address } = req.query;

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        return res.status(404).send('Not Found');
    }

    const pdfBuffer = await getPdfMessageBuffer(urgentAction, subject, signature, address);
    res.write(pdfBuffer, 'binary');
    return res.end();
});

urgentActionsRouter.post('/:id/send', async (req, res, next) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        return res.status(400).send(`Invalid UUID format: ${id}`);
    }

    const { signature, subject, email, address } = req.body;

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        return res.status(404).send('Not Found');
    }

    const pdfBuffer = await getPdfMessageBuffer(urgentAction, subject, signature, address);
    try {
        await sendMail(email, 'On y est presque !', getLetterMailBody({ urgentAction }), {
            filename: 'letter.pdf',
            content: pdfBuffer,
        });
    } catch (err) {
        return next(err);
    }

    return res.end();
});
