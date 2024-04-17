/* eslint-disable @typescript-eslint/member-ordering */
import { readFile, writeFile } from 'fs/promises';
import createDebug from 'debug';
import {
  type ArticleSingleCreateDto,
  type ArticleSingle,
} from '../entities/article';
import { type Repo } from './type.repo';
import { HttpError } from '../middleware/errors.middleware.js';
const debug = createDebug('W7E:articles:repository:fs');

export class ArticlesFsRepo
  implements Repo<ArticleSingle, ArticleSingleCreateDto>
{
  constructor() {
    debug('Instantiated articles fs repository');
  }

  private async load(): Promise<ArticleSingle[]> {
    const data = await readFile('articles.json', 'utf-8');
    return JSON.parse(data) as ArticleSingle[];
  }

  private async save(articles: ArticleSingle[]) {
    await writeFile('articles.json', JSON.stringify(articles, null, 2));
  }

  private checkIfArticleExists(id: string, articles: ArticleSingle[]) {
    const article = articles.find((article) => article.id === id);
    if (!article) {
      throw new HttpError(404, 'Not Found', `Article ${id} not found`);
    }

    return article;
  }

  async readAll() {
    const articles = await this.load();
    return articles;
  }

  async readById(id: string) {
    const articles = await this.load();
    const article = this.checkIfArticleExists(id, articles);
    return article;
  }

  async create(data: ArticleSingleCreateDto) {
    const newArticleSingle: ArticleSingle = {
      id: crypto.randomUUID(),
      content: data.content ?? '',
      isPublished: data.isPublished ?? false,
      ...data,
    };
    let articles = await this.load();
    articles = [...articles, newArticleSingle];
    await this.save(articles);
    return newArticleSingle;
  }

  async update(id: string, data: Partial<ArticleSingle>) {
    let articles = await this.load();
    const article = this.checkIfArticleExists(id, articles);

    const newArticleSingle: ArticleSingle = { ...article, ...data };
    articles = articles.map((article) =>
      article.id === id ? newArticleSingle : article
    );
    await this.save(articles);
    return newArticleSingle;
  }

  async delete(id: string) {
    let articles = await this.load();
    const article = this.checkIfArticleExists(id, articles);

    articles = articles.filter((article) => article.id !== id);
    await this.save(articles);
    return article;
  }
}
