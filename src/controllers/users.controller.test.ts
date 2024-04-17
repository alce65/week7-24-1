import { UsersController } from './users.controller';
import { type UsersSqlRepo } from '../repositories/users.sql.repo';

describe('Given a instance of the class UsersController', () => {
  const repo = {} as unknown as UsersSqlRepo;

  const controller = new UsersController(repo);
  test('Then it should be instance of the class', () => {
    expect(controller).toBeInstanceOf(UsersController);
  });
});
