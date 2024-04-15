import { type Request, type Response } from 'express';
import { type Article } from '../entities/article';
import createDebug from 'debug';
import { type ArticlesFsRepo } from '../repositories/articles.fs.repo.js';

const debug = createDebug('W7E:articles:controller');

export class ArticlesController {
  constructor(private readonly repo: ArticlesFsRepo) {
    debug('Instantiated article controller');
  }

  async getAll(req: Request, res: Response) {
    const result = await this.repo.readAll();
    res.json(result);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.repo.readById(id);
    res.json(result);
  }

  async create(req: Request, res: Response) {
    const data = req.body as Article;
    const result = await this.repo.create(data);
    res.status(201);
    res.json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body as Article;
    const result = await this.repo.update(id, data);
    res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.repo.delete(id);
    res.json(result);
  }
}
