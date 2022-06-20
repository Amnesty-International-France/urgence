import { Router } from 'express';

import { createUrgentAction, createSetting, truncateAll } from './fixtureLoader';
import urgentAction from './fixtures/urgentAction.json';
import settings from './fixtures/settings.json';

export const testRouter = Router();

testRouter.get('/createUrgentAction', async (req, res) => {
    const result = await createUrgentAction(urgentAction);
    res.send(result);
});

testRouter.get('/createSettings', async (req, res) => {
    settings.map(async (setting) => {
        await createSetting(setting);
    });
    res.send({ done: true });
});

testRouter.post('/clearDb', async (req, res) => {
    await truncateAll();
    res.send({ done: true });
});

export default testRouter;
