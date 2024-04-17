import { type PrismaClient } from '@prisma/client';
import createDebug from 'debug';
import { HttpError } from '../middleware/errors.middleware.js';
import { type Article, type ArticleCreateDto } from '../entities/article.js';
import { type Repo } from './type.repo.js';
const debug = createDebug('W7E:articles:repository:sql');

const select = {
  id: true,
  title: true,
  author: {
    select: {
      name: true,
      email: true,
      birthDate: true,
      role: true,
    },
  },
  content: true,
  isPublished: true,
};

export class ArticlesSqlRepo implements Repo<Article, ArticleCreateDto> {
  constructor(private readonly prisma: PrismaClient) {
    debug('Instantiated articles sql repository');
  }

  async readAll() {
    const articles = await this.prisma.article.findMany({
      select,
    });
    return articles;
  }

  async readById(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      select,
    });

    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    return article;
  }

  async create(data: ArticleCreateDto) {
    return this.prisma.article.create({
      data: {
        content: data.content ?? '',
        ...data,
      },
      select,
    });
  }

  async update(id: string, data: Partial<ArticleCreateDto>) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      select,
    });
    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    return this.prisma.article.update({
      where: { id },
      data,
      select,
    });
  }

  async delete(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      select,
    });
    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    return this.prisma.article.delete({
      where: { id },
      select,
    });
  }
}
