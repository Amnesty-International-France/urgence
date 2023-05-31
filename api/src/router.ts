import bodyParser from 'body-parser';
import { Router } from 'express';
import { getMetaDataTemplateBySlug } from './urgentActions/metadata';
import { getUrgentAction, updateUrgentAction } from './urgentActions/repository';

const router = Router();

router.use(bodyParser.json());

router.get(/metadata/, async (req, res, next) => {
    const url = req.url;
    const regex = /\/ua\/([^\/]+)/;
    const urlMatch = url.match(regex);
    const slug = urlMatch ? urlMatch[1] : '';
    const metadata = await getMetaDataTemplateBySlug(slug);

    return res.send(metadata);
});

router.put('/campaign/:id/mailto-error', async (req, res) => {
    try {
        const action = await getUrgentAction(req.params.id);
        if (!action) {
            throw new Error('Urgent action not found.');
        }

        const nbErrors = action['response_errors'] + 1;
        await updateUrgentAction(action.id, { 'response_errors': nbErrors});

        return res.send({msg: 'ok' });
    } catch (error: any) {
        res.status(400).send({ msg: 'Urgent action not found.' })
    }
});

if (process.env.NODE_ENV === 'test') {
    router.use('/test', require('./tests/router').default);
}

export default router;
