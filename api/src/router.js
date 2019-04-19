import bodyParser from 'body-parser';
import { Router } from 'express';

import { urgentActionsRouter } from './urgentActions/router';

const router = new Router();

router.use(bodyParser.json());
router.use('/urgent-actions', urgentActionsRouter);

if (process.env.NODE_ENV === 'test') {
    router.use('/test', require('./tests/router').default);
}

export const apiRouter = router;
