import bodyParser from 'body-parser';
import { Router } from 'express';
//import { apolloUploadExpress } from 'apollo-upload-server';

//import { graphqlRouter, graphiqlRouter } from './graphql/router';
import { urgentActionsRouter } from './urgentActions/router';

const router = new Router();

router.use(bodyParser.json());
router.use('/urgent-actions', urgentActionsRouter);
//router.post('/', apolloUploadExpress(), graphqlRouter);


if (process.env.NODE_ENV === 'test') {
    router.use('/test', require('./tests/router').default);
}

export const apiRouter = router;
