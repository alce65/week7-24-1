import { type ArticlesController } from '../controllers/articles.controller';
import { type AuthInterceptor } from '../middleware/auth.interceptor';
import { ArticlesRouter } from './articles.router';

describe('Given a instance of the class ArticlesRouter', () => {
  const controller = {
    getAll: jest.fn(),
    getById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as ArticlesController;
  const authInterceptor = {
    authentication: jest.fn(),
  } as unknown as AuthInterceptor;
  const router = new ArticlesRouter(controller, authInterceptor);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(ArticlesRouter);
  });
});
