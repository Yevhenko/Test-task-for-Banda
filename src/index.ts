import { env } from './config/env';
import 'reflect-metadata';

import express from 'express';
import epl from 'express-pino-logger';
import bodyParser from 'body-parser';

import { logger } from './logger';
import router from './router';
import { createConnection } from 'typeorm';

const app = express();

const port = env.APP_PORT;

app.use(epl({ logger: logger }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

createConnection()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .then(async (connection) => {
    logger.info('Connection to db is successful');

    app.listen(port, () => {
      return logger.info(`Server is listening on ${port}`);
    });
  })
  .catch((error) => console.error(error));
