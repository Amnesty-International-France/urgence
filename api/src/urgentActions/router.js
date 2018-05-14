import isUUID from 'validator/lib/isUUID';
import pdf from 'html-pdf';
import { Router } from 'express';
import { getUrgentAction } from './repository';

export const urgentActionsRouter = new Router();

urgentActionsRouter.get('/:id.pdf', async (req, res) => {
    const { id } = req.params;
    if (!isUUID(id)) {
        return res.status(400).send(`Invalid UUID format: ${id}`);
    }

    const urgentAction = await getUrgentAction(id);
    if (!urgentAction) {
        return res.status(404).send('Not Found');
    }

    const urgentActionLetter = `<h1>Hello world!</h1><p>It seems to work!</p>`;

    return pdf.create(urgentActionLetter, {
        format: 'A4',
        border: '1cm',
    }).toStream((err, stream) => {
        stream.pipe(res);
    });
});

export default urgentActionsRouter;