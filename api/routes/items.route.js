import express from 'express';
import cors from 'cors';
import querystring from 'querystring-es3';

import { getSearch } from '../mla-api/get-search.js'
import { getItemDetail } from '../mla-api/get-item-detail.js';
import apiConfig from '../mla-api-config/api.config.js';

const router = express.Router();

const corsOptions = { origin: '*', optionsSuccessStatus: 200 }

/**
 * @openapi
 * '/api/items':
 *  get:
 *     tags:
 *     - Items
 *     summary: Product search by query and category.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search by text.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Search by text category.
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.get(`${apiConfig.api}/items`, cors(corsOptions), (req, res) => {
  const args = querystring.stringify(req.query);
  getSearch(args, (result, error) => {
    if (!!error) {
      res.status(400).send({ message: error.message });
    } else res.status(200).send(result);
  });
});

/**
 * @openapi
 * '/api/items/{id}':
 *  get:
 *     tags:
 *     - Items
 *     summary: Product's Detail by Id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         description: Product Id.
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */
router.get(`${apiConfig.api}/items/:id`, cors(corsOptions), (req, res) => {
  getItemDetail(req.params.id, (result, error) => {
    if (!!error) {
      res.status(400).send({ message: error.message });
    } else res.status(200).send(result);
  });
});

router.get('/', cors(corsOptions), (req, res) => {
  res.status(200).send('OK')
});

export default router;