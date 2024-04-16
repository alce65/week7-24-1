import { type ArticleCreateDto, type Article } from '../entities/article';

export type ArticlesRepo = {
  readAll(): Promise<Article[]>;
  readById(id: string): Promise<Article>;
  create(data: ArticleCreateDto): Promise<Article>;
  update(id: string, data: Partial<Article>): Promise<Article>;
  delete(id: string): Promise<Article>;
};
