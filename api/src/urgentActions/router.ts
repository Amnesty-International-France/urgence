import { Router } from 'express';
import isUUID from 'validator/lib/isUUID';

import { getUrgentAction } from './repository';
import { getPdfMessageBuffer } from './getPdfMessageBuffer';
import { sendMail } from '../mailer';
import { getLetterMailBody } from './letterMailBody';

const urgentActionsRouter = Router();

export type PdfQuery = {
    civility: string;
    firstname: string;
    lastname: string;
    subject: string;
    addressMain: string;
    addressMore: string;
    postalCode: string;
    city: string;
    country: string;
};

urgentActionsRouter.get('/:id.pdf', async (req, res, next) => {
    const { id } = req.params;

    if (!isUUID(id)) {
        return res.status(400).send(`Invalid UUID format: ${id}`);
    }

    const {
        civility,
        firstname,
        lastname,
        subject,
        addressMain,
        addressMore,
        postalCode,
        city,
        country,
    } = req.query as PdfQuery;

    const urgentAction = await getUrgentAction(id);

    if (!urgentAction) {
        return res.status(404).send('Not Found');
    }

    const pdfBuffer = await getPdfMessageBuffer(
        urgentAction,
        subject,
        civility,
        firstname,
        lastname,
        addressMain,
        addressMore,
        postalCode,
        city,
        country,
    );

    res.write(pdfBuffer, 'binary');
    return res.end();
});

urgentActionsRouter.post('/:id/send', async (req, res, next) => {
    const { id } = req.params;

    if (!isUUID(id)) {
        return res.status(400).send(`Invalid UUID format: ${id}`);
    }

    try {
        const {
            civility,
            firstname,
            lastname,
            subject,
            email,
            addressMain,
            addressMore,
            postalCode,
            city,
            country,
        } = req.body;

        const urgentAction = await getUrgentAction(id);

        if (!urgentAction) {
            return res.status(404).send('Not Found');
        }

        const pdfBuffer = await getPdfMessageBuffer(
            urgentAction,
            subject,
            civility,
            firstname,
            lastname,
            addressMain,
            addressMore,
            postalCode,
            city,
            country,
        );

        await sendMail({
            to: email,
            subject: 'On y est presque !',
            ...getLetterMailBody({ urgentAction }),
            attachments: [
                {
                    filename: 'letter.pdf',
                    content: pdfBuffer,
                },
            ],
        });
    } catch (err) {
        return next(err);
    }

    return res.end();
});

export default urgentActionsRouter;
