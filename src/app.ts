import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { UsersRouter } from './routers/users.router.js';
const debug = createDebug('W7E:app');
export const createApp = () => {
  const app = express();
  debug('Starting app');

  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));
  app.use((req, res, next) => {
    debug('Request received');
    next();
  });

  const usersRouter = new UsersRouter();
  app.use('/users', usersRouter.router);

  return app;
};
