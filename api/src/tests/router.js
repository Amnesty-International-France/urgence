import { Router } from 'express';

import { createUrgentAction, truncateAll } from './fixtureLoader';
import urgentAction from './fixtures/urgentAction.json';

export const testRouter = new Router();

testRouter.get('/createUrgentAction', async (req, res) =>
    res.send(await createUrgentAction(urgentAction)));


testRouter.delete('/clearDb', async (req, res) => {
    const id = await truncateAll();

    res.send({ done: true });
});

export default testRouter;
