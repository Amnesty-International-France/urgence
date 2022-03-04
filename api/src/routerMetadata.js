import bodyParser from 'body-parser';
import { Router } from 'express';

const router = new Router();

router.use(bodyParser.json());

router.get('/:slug', async (req, res, next) => {
    res.write("coucou");
    return res.end();
});

export default router;
