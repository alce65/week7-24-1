import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import {
  type UserCreateDto,
  type User,
  type UserLoginDto,
} from '../entities/user';
import {
  userCreateDtoSchema,
  userUpdateDtoSchema,
} from '../entities/user.schema.js';
import { type WithLoginRepo } from '../repositories/type.repo';
import { BaseController } from './base.controller.js';
import { HttpError } from '../middleware/errors.middleware';

const debug = createDebug('W7E:users:controller');

export class UsersController extends BaseController<User, UserCreateDto> {
  constructor(protected readonly repo: WithLoginRepo<User, UserCreateDto>) {
    super(repo, userCreateDtoSchema, userUpdateDtoSchema);

    debug('Instantiated user controller');
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, name, password } = req.body as UserLoginDto;

    if ((!email && !name) || !password) {
      next(
        new HttpError(400, 'Bad Request', 'Email and password are required')
      );
      return;
    }

    const user = await this.repo.searchForLogin(
      email ? 'email' : 'name',
      email || name
    );

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    if (user.password !== password) {
      res.status(401).send('Invalid password');
      return;
    }

    res.status(200).send('Login successful');
  }
}
