import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type ArticlesController } from '../controllers/articles.controller';
import { type AuthInterceptor } from '../middleware/auth.interceptor';

const debug = createDebug('W7E:articles:router');

export class ArticlesRouter {
  router = createRouter();

  constructor(
    readonly controller: ArticlesController,
    readonly authInterceptor: AuthInterceptor
  ) {
    debug('Instantiated articles router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    this.router.post(
      '/',
      authInterceptor.authentication.bind(authInterceptor),
      controller.create.bind(controller)
    );
    this.router.patch(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.update.bind(controller)
    );
    this.router.delete(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }
}
