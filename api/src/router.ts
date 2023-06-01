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

router.get('/campaign/:id/mailto/:status', async (req, res) => {
    try {
        const action = await getUrgentAction(req.params.id);
        if (!action) {
            throw new Error('Urgent action not found.');
        }

        await updateUrgentAction(action.id, {
            'mailto_count': action['mailto_count'] + 1,
            'mailto_errors': req.params?.status === 'failure' ? action['mailto_errors'] + 1 : action['mailto_errors'],
        });

        return res.send({msg: 'ok' });
    } catch (error: any) {
        res.status(400).send({ msg: 'Urgent action not found.' })
    }
});

if (process.env.NODE_ENV === 'test') {
    router.use('/test', require('./tests/router').default);
}

export default router;
