const { Router } = require('express');

const router = new Router();

router.get('/api/urgentActions', (req, res) => {
    return res.status(200).json([{
        id: 1,
        title: 'Hello world!',
    }, {
        id: 2,
        title: 'All your bases belong to us!',
    }]);
});

module.exports = router;
