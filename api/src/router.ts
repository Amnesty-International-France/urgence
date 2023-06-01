import bodyParser from 'body-parser';
import { Router } from 'express';
import { getMetaDataTemplateBySlug } from './urgentActions/metadata';
import { incrementMailtoCounter } from './urgentActions/repository';

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

router.post('/campaign/:id/record-mailto', async (req, res) => {
    try {
        await incrementMailtoCounter(req.params.id, req.body.status);
        res.status(204).send();
    } catch (error: any) {
        console.log(error)
        res.status(500).send({ msg: "An error occurred while managing the campaign's mailto counter." })
    }
});

if (process.env.NODE_ENV === 'test') {
    router.use('/test', require('./tests/router').default);
}

export default router;
