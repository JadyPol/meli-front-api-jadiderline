import express from 'express';

import routes from './items.route.js'

const router = express.Router();

router.use(routes);

export default router;