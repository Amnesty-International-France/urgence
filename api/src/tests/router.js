import { Router } from 'express';

import { createUrgentAction, createSetting, truncateAll } from './fixtureLoader';
import urgentAction from './fixtures/urgentAction.json';
import settings from './fixtures/settings.json';

export const testRouter = new Router();

testRouter.get('/createUrgentAction', async (req, res) => {
    const result = await createUrgentAction(urgentAction);
    res.send(result);
});

testRouter.get('/createSetting', async (req, res) => {
    const result = await Promise.all(settings.map(setting => createSetting(setting)));
    res.send({ done: true });
});

testRouter.delete('/clearDb', async (req, res) => {
    const id = await truncateAll();

    res.send({ done: true });
});

export default testRouter;
