import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { UsersRouter } from './routers/users.router.js';
import { ArticlesFsRepo } from './repositories/articles.fs.repo.js';
import { ArticlesController } from './controllers/articles.controller.js';
import { ArticlesRouter } from './routers/articles.router.js';

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

  const articlesRepo = new ArticlesFsRepo();
  const articlesController = new ArticlesController(articlesRepo);
  const articlesRouter = new ArticlesRouter(articlesController);
  app.use('/articles', articlesRouter.router);

  return app;
};
