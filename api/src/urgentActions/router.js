const { Router } = require('express');
const { getUrgentActions } = require('./repository');

const router = new Router();

router.get('/api/urgentActions', async (req, res, next) => {
    try {
        const urgentActions = await getUrgentActions(req.dbClient);
        return res.status(200).json(urgentActions);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
