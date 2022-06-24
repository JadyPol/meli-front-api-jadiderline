import express from 'express';

const app = express();

import router from './api/routes/index.js';
import swaggerDocs from './swagger.js'

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`App listening at PORT:${port}`)
  swaggerDocs(app, port);
})
