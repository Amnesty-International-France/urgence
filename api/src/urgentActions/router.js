import { Router } from 'express';
import isUUID from 'validator/lib/isUUID';

import nunjucks from 'nunjucks';
import { getUrgentAction } from './repository';
import { getPdfMessageBuffer } from './getPdfMessageBuffer';
import { sendMail } from '../mailer';

export const urgentActionsRouter = new Router();

urgentActionsRouter.post('/:id/send', async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        return res.status(400).send(`Invalid UUID format: ${id}`);
    }

    const { signature, subject } = req.body;

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        return res.status(404).send('Not Found');
    }

    const pdfBuffer = await getPdfMessageBuffer(urgentAction, subject, signature);
    await sendMail('jonathan@marmelab.com', 'Test', 'It works!', {
        filename: 'letter.pdf',
        content: pdfBuffer,
    });

    return res.end();
});
