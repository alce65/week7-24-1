import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import { type ArticleCreateDto, type Article } from '../entities/article';
import {
  articleCreateDtoSchema,
  articleUpdateDtoSchema,
} from '../entities/article.schema.js';
import { type Repo } from '../repositories/type.repo';
import { BaseController } from './base.controller.js';
import { type Payload } from '../services/auth.services';

const debug = createDebug('W7E:articles:controller');

export class ArticlesController extends BaseController<
  Article,
  ArticleCreateDto
> {
  constructor(protected readonly repo: Repo<Article, ArticleCreateDto>) {
    super(repo, articleCreateDtoSchema, articleUpdateDtoSchema);

    debug('Instantiated article controller');
  }

  async create(req: Request, res: Response, next: NextFunction) {
    debug('Creating article');
    req.body.authorId = (req.body.payload as Payload).id;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { payload, ...rest } = req.body;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    req.body = rest;

    await super.create(req, res, next);
  }
}
