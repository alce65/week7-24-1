import { Router as createRouter } from 'express';
import createDebug from 'debug';
import { type UsersController } from '../controllers/users.controller';

const debug = createDebug('W7E:users:router');

export class UsersRouter {
  router = createRouter();

  constructor(readonly controller: UsersController) {
    debug('Instantiated users router');

    this.router.post('/login', controller.login.bind(controller));
    this.router.post('/register', controller.create.bind(controller));

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));
    // Now register this.router.post('/', controller.create.bind(controller));
    this.router.patch('/likes/:id', controller.update.bind(controller));
    this.router.delete('/:id', controller.delete.bind(controller));
  }
}
