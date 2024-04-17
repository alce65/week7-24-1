import createDebug from 'debug';
import { type ArticleCreateDto, type Article } from '../entities/article';
import {
  articleCreateDtoSchema,
  articleUpdateDtoSchema,
} from '../entities/article.schema.js';
import { type Repo } from '../repositories/type.repo';
import { BaseController } from './base.controller.js';

const debug = createDebug('W7E:articles:controller');

export class ArticlesController extends BaseController<
  Article,
  ArticleCreateDto
> {
  constructor(protected readonly repo: Repo<Article, ArticleCreateDto>) {
    super(repo, articleCreateDtoSchema, articleUpdateDtoSchema);

    debug('Instantiated article controller');
  }
}
