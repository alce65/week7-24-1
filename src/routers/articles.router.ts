import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type ArticlesController } from '../controllers/articles.controller';
import { type AuthInterceptor } from '../middleware/auth.interceptor';
import { type ArticlesSqlRepo } from '../repositories/articles.sql.repo';

const debug = createDebug('W7E:articles:router');

export class ArticlesRouter {
  router = createRouter();

  constructor(
    readonly controller: ArticlesController,
    readonly authInterceptor: AuthInterceptor,
    readonly articlesSqlRepo: ArticlesSqlRepo
  ) {
    debug('Instantiated articles router');

    this.router.get(
      '/',
      authInterceptor.authentication.bind(authInterceptor),
      controller.getAll.bind(controller)
    );
    this.router.get(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.getById.bind(controller)
    );
    this.router.post(
      '/',
      authInterceptor.authentication.bind(authInterceptor),
      controller.create.bind(controller)
    );
    this.router.patch(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      authInterceptor
        .authorization(articlesSqlRepo, 'author')
        .bind(authInterceptor),
      controller.update.bind(controller)
    );
    this.router.delete(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      authInterceptor
        .authorization(articlesSqlRepo, 'author')
        .bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }
}
