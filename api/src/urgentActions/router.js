import { Router } from 'express';
import isUUID from 'validator/lib/isUUID';

import nunjucks from 'nunjucks';
import { getUrgentAction } from './repository';
import { getPdfMessageBuffer } from './getPdfMessageBuffer';
import { sendMail } from '../mailer';

export const urgentActionsRouter = new Router();

urgentActionsRouter.get('/:id/send', async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        return res.status(400).send(`Invalid UUID format: ${id}`);
    }

    const { signature, subject } = req.query;

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        return res.status(404).send('Not Found');
    }

    const pdfStream = await getPdfMessageBuffer(urgentAction);
    pdfStream.pipe(res);
});
