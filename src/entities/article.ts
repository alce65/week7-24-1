import { type User } from './user';

export type ArticleSingle = {
  id: string;
  title: string;
  author: string;
  content: string;
  isPublished: boolean;
};

export type ArticleSingleCreateDto = {
  title: string;
  author: string;
  content?: string;
  isPublished?: boolean;
};

export type Article = {
  id: string;
  title: string;
  author: Partial<User>;
  content: string;
  isPublished: boolean;
};

export type ArticleCreateDto = {
  title: string;
  authorId: string;
  content?: string;
  isPublished?: boolean;
};
