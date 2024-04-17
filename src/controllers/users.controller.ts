import createDebug from 'debug';
import { type UserCreateDto, type User } from '../entities/user';
import {
  userCreateDtoSchema,
  userUpdateDtoSchema,
} from '../entities/user.schema.js';
import { type Repo } from '../repositories/type.repo';
import { BaseController } from './base.controller.js';

const debug = createDebug('W7E:users:controller');

export class UsersController extends BaseController<User, UserCreateDto> {
  constructor(protected readonly repo: Repo<User, UserCreateDto>) {
    super(repo, userCreateDtoSchema, userUpdateDtoSchema);

    debug('Instantiated user controller');
  }
}
