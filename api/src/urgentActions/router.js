import path from 'path';
import pdf from 'html-pdf';
import { Router } from 'express';
import isUUID from 'validator/lib/isUUID';

import nunjucks from 'nunjucks';
import { getUrgentAction } from './repository';

export const urgentActionsRouter = new Router();

urgentActionsRouter.get('/:id.pdf', async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        return res.status(400).send(`Invalid UUID format: ${id}`);
    }

    const { signature, subject } = req.query;

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        return res.status(404).send('Not Found');
    }

    const urgentActionLetter = nunjucks.render(path.join(__dirname, './letter.html'), {
        signature,
        subject,
        urgentAction,
    });

    return pdf.create(urgentActionLetter, {
        format: 'A4',
        border: '1cm',
    }).toStream((err, stream) => {
        stream.pipe(res);
    });
});

export default urgentActionsRouter;