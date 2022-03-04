import bodyParser from 'body-parser';
import { Router } from 'express';

import urgentActionsRouter from './urgentActions/router';

const router = new Router();

router.use(bodyParser.json());
router.use('/urgent-actions', urgentActionsRouter);

router.get('/metadata/ua/:slug', async (req, res, next) => {
    const params = req.params;
    const query = req.query;
    
    console.log(query)
    console.log(params)
    res.write("coucou");
    return res.end();
});

router.get('/yolo', async (req, res, next) => {
    res.write("yolo");
    return res.end();
});

if (process.env.NODE_ENV === 'test') {
    router.use('/test', require('./tests/router').default);
}

export default router;
