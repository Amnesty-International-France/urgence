import bodyParser from 'body-parser';
import { Router } from 'express';
import { getMetaDataTemplateBySlug } from './urgentActions/metadata';

import urgentActionsRouter from './urgentActions/router';

const router = Router();

router.use(bodyParser.json());
router.use('/urgent-actions', urgentActionsRouter);

router.get(/metadata/, async (req, res, next) => {
    const url = req.url;
    const regex = /\/ua\/([^\/]+)/;
    const urlMatch = url.match(regex);
    const slug = urlMatch ? urlMatch[1] : '';
    const metadata = await getMetaDataTemplateBySlug(slug);

    return res.send(metadata);
});

if (process.env.NODE_ENV === 'test') {
    router.use('/test', require('./tests/router').default);
}

export default router;
