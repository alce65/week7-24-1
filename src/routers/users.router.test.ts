import { type UsersController } from '../controllers/users.controller';
import { UsersRouter } from './users.router';

describe('Given a instance of the class UsersRouter', () => {
  const controller = {
    login: jest.fn(),
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as UsersController;
  const router = new UsersRouter(controller);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(UsersRouter);
  });
});
