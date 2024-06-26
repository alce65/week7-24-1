import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { UsersRouter } from './routers/users.router.js';
import { ArticlesController } from './controllers/articles.controller.js';
import { ArticlesRouter } from './routers/articles.router.js';
import { ErrorsMiddleware } from './middleware/errors.middleware.js';
import { type PrismaClient } from '@prisma/client';
import { ArticlesSqlRepo } from './repositories/articles.sql.repo.js';
import { UsersSqlRepo } from './repositories/users.sql.repo.js';
import { UsersController } from './controllers/users.controller.js';
import { AuthInterceptor } from './middleware/auth.interceptor.js';
import { FilesController } from './controllers/files.controller.js';
import { FilesRouter } from './routers/files.router.js';
import { FilesInterceptor } from './middleware/files.interceptor.js';

const debug = createDebug('W7E:app');
export const createApp = () => {
  debug('Creating app');
  return express();
};

export const startApp = (app: Express, prisma: PrismaClient) => {
  debug('Starting app');
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.static('public'));

  const authInterceptor = new AuthInterceptor();
  const filesInterceptor = new FilesInterceptor();

  // Prev const articlesRepo = new ArticlesFsRepo();
  const articlesRepo = new ArticlesSqlRepo(prisma);
  const articlesController = new ArticlesController(articlesRepo);
  const articlesRouter = new ArticlesRouter(
    articlesController,
    authInterceptor,
    articlesRepo
  );
  app.use('/articles', articlesRouter.router);

  const usersRepo = new UsersSqlRepo(prisma);
  const usersController = new UsersController(usersRepo);
  const usersRouter = new UsersRouter(
    usersController,
    authInterceptor,
    filesInterceptor
  );
  app.use('/users', usersRouter.router);

  const filesController = new FilesController();
  const filesRouter = new FilesRouter(filesController, filesInterceptor);

  app.use('/files', filesRouter.router);
  const errorsMiddleware = new ErrorsMiddleware();
  app.use(errorsMiddleware.handle.bind(errorsMiddleware));
};
