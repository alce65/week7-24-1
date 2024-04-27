import { type ArticlesController } from '../controllers/articles.controller';
import { type AuthInterceptor } from '../middleware/auth.interceptor';
import { type ArticlesSqlRepo } from '../repositories/articles.sql.repo';
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
    authorization: jest.fn().mockReturnValue(jest.fn()),
  } as unknown as AuthInterceptor;
  const repo = {} as unknown as ArticlesSqlRepo;

  const router = new ArticlesRouter(controller, authInterceptor, repo);
  test('Then it should be instance of the class', () => {
    expect(router).toBeInstanceOf(ArticlesRouter);
  });
});
