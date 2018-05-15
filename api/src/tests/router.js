import { Router } from 'express';

import fixtureLoader from './fixtureLoader';
import urgentAction from './urgentAction.json';

export const testRouter = new Router();

console.log(JSON.stringify(urgentAction.story));

testRouter.get('/createUrgentAction', async (req, res) =>
    res.send(await fixtureLoader.createUrgentAction(urgentAction)));


testRouter.delete('/clearDb', async (req, res) => {
    const id = await fixtureLoader.truncateAll();

    res.send({ done: true });
});

export default testRouter;
